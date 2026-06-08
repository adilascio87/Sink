# Michelle — Technical Architecture

The hard constraint shapes everything: **Michelle must be a single shareable link — a static web app with no backend, no login, no API keys** — that still does speaking, listening, and spaced repetition. Everything below serves that.

---

## 1. Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Build / framework | **Vite + Vue 3 + TypeScript** | Fast, light, produces a pure static bundle; Vue keeps the UI declarative and approachable. |
| State | **Pinia** | Simple, typed stores for session, SRS, and progress. |
| Persistence | **IndexedDB via Dexie** (with a localStorage fallback for tiny prefs) | Holds SRS state, progress, and settings entirely on-device. No server. |
| Styling | **Tailwind CSS v4** + a small design-token layer | Calm, editorial, adult aesthetic; fast to build and keep consistent. |
| Speech | **Web Speech API** (`speechSynthesis` + `SpeechRecognition`) | Native-paced TTS and on-device speech recognition with zero cost and zero keys. |
| Routing | **Vue Router** (hash or history mode) | A few screens; trivial to host statically. |
| Packaging | **PWA (optional, later)** | Installable + offline, but it's still just a URL — never an app-store app. |
| Hosting | **Cloudflare Pages or GitHub Pages** | Push → get a shareable HTTPS URL. Both are free for static sites. |

> Rationale for choosing Vue+Vite over the alternatives you offered: a single-file HTML/JS app can't cleanly scale to SRS + content packs + speech, and a full Nuxt app is heavier than a static, backend-free site needs. Vite+Vue is the sweet spot. (You said "whatever you think is best" — this is it; easy to change before the build starts.)

All content (scenarios, dialogues, vocab) ships as **typed data files bundled at build time**, so the deployed link is fully self-contained.

---

## 2. Data model (content as data, not code)

```ts
// A communicative situation — the top-level unit of learning.
interface Scenario {
  id: string
  tier: 1 | 2 | 3 | 4
  title: string            // "Ordering at a café"
  cefr: 'A1' | 'A2' | 'B1' | 'B1+'
  goal: string             // what you'll be able to do after
  dialogue: DialogueLine[]
  chunks: Chunk[]          // target phrases
  vocab: VocabItem[]       // target words
  grammarNote?: string     // just-in-time, optional
  roleplay: RoleplayBranch // production tree
  shadowing: string[]      // line ids for the listening gym
}

interface DialogueLine {
  id: string
  speaker: 'A' | 'B'
  es: string               // Spanish
  en: string               // English meaning
  notes?: string           // register/regional note
}

interface Chunk {
  id: string
  es: string               // "¿Me puede traer la cuenta?"
  en: string
  literal?: string         // optional word-for-word gloss
}

interface VocabItem { id: string, es: string, en: string, pos?: string }

// A small branching tree: prompt -> acceptable spoken responses -> next.
interface RoleplayBranch {
  prompt: string                       // what the other person says (TTS)
  accept: string[]                     // acceptable learner responses
  hints: string[]
  next?: RoleplayBranch
}

// On-device SRS state, one record per studied item (FSRS-lite).
interface SrsCard {
  itemId: string
  type: 'comprehension' | 'production' | 'listening'
  stability: number
  difficulty: number
  due: number              // epoch ms
  reps: number
  lapses: number
}
```

---

## 3. Screens / information architecture

1. **Home / Today** — the daily loop entry point: "Continue" + what's due. Shows current scenario and review count.
2. **Scenario player** — runs the 5-phase loop (input → roleplay → listening gym → cool-down).
3. **Review** — the SRS session (warm-up and standalone).
4. **Library** — browse all scenarios by tier; jump to any.
5. **Progress** — the competence dashboard (situations you can hold, active chunks, speaking trend).
6. **Settings** — voice/accent, speech rate, recognition on/off, data export/reset.

---

## 4. Project layout (inside `michelle/`)

```
michelle/
├── docs/                 # this plan
├── index.html
├── package.json
├── vite.config.ts
├── public/               # static assets, favicon, manifest
└── src/
    ├── main.ts
    ├── App.vue
    ├── router/
    ├── stores/           # Pinia: session, srs, progress, settings
    ├── lib/
    │   ├── srs.ts        # FSRS-lite scheduler
    │   ├── speech.ts     # Web Speech API wrapper (TTS + recognition + fallback)
    │   └── db.ts         # Dexie / IndexedDB persistence
    ├── content/
    │   ├── types.ts      # the interfaces above
    │   └── es/           # Spanish content packs, one file per scenario
    ├── components/
    └── views/            # the six screens
```

This folder is **fully self-contained** — its own `package.json`, its own build — so it never touches Sink's tooling and can be lifted into its own repo later (`git subtree split` / `git filter-repo`) with zero rework.

---

## 5. Privacy & offline

- No accounts, no analytics by default, no network calls after the page loads.
- Microphone audio is processed by the browser on-device and never uploaded.
- All progress lives in IndexedDB; **Settings → Export** writes a JSON backup the user controls.
- With the optional PWA layer, the whole thing works offline after first load.

---

## 6. How it becomes a shareable link

1. `pnpm build` produces a static `dist/`.
2. Deploy `dist/` to Cloudflare Pages or GitHub Pages → an HTTPS URL.
3. Share the URL. Anyone who opens it gets their own independent local progress. Done — no extension, no install required.
