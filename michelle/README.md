# Michelle

**A conversational Spanish learning protocol and shareable web app — built to make you *speak*, not to make you collect streaks.**

Michelle is a deliberate reaction against the language apps that have failed most people: the ones that feel like slot machines, reward tapping over talking, and leave you with 400-day streaks but unable to order a coffee. The single goal here is **strong, confident conversational Spanish** — the ability to understand and be understood in real situations — not paper "fluency," not grammar-exam mastery, not points.

It is a **single self-contained file**. Double-click it and it opens in your browser — on a laptop or a phone. No hosting, no server, no extension, no app store, no login, no backend. Everything runs in the browser and saves to your device.

---

## Why this exists (and why the others failed)

| What most apps do | What Michelle does |
| --- | --- |
| Optimize for daily engagement (streaks, XP, leagues) | Optimize for **time-to-speaking** and retention |
| Teach isolated word→translation pairs | Teach **lexical chunks** and whole phrases you actually say |
| Mostly passive recognition (tap the tiles) | Force **active recall** and **speaking out loud** |
| Random vocabulary | **Frequency-driven** — the ~1,000–2,000 words that cover most real conversation |
| No real listening at natural speed | A **listening gym** at native pace, with shadowing |
| Cartoon pressure and guilt | A **calm, adult, editorial** feel — competence over confetti |

---

## The three pillars (your chosen methods)

1. **Scenario roleplay & dialogues** — every unit is a real situation (ordering food, asking directions, small talk, a phone call). You read/hear a natural dialogue, then *play a role* and produce responses.
2. **Spaced-repetition vocab & chunks** — high-frequency words and phrases surface on an SRS schedule (FSRS-lite) so they actually stick for the long term.
3. **Speaking & listening** — built entirely on the browser's **Web Speech API**: text-to-speech for native-paced listening and shadowing, and speech recognition for pronunciation/production practice. No paid services, no API keys.

> A fourth pillar — a live AI conversation partner — was intentionally **left out of v1** because it would require an API key and a backend, breaking the "pure shareable static link" promise. It's noted in the roadmap as an optional later add-on.

---

## Documents in this plan

- **[docs/PROTOCOL.md](docs/PROTOCOL.md)** — the learning methodology, the daily loop, and the curriculum structure
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — tech stack, data model, screens, and how it ships as a shareable link
- **[docs/ROADMAP.md](docs/ROADMAP.md)** — milestones from skeleton to first Spanish content pack to deploy
- **[docs/METHODS.md](docs/METHODS.md)** — the evidence-based techniques Michelle draws from (Krashen, spaced repetition, Pimsleur, Michel Thomas, shadowing) and where each lives in the app

---

## Status

**Working MVP built** (Vite + Vue 3 + TS). Implemented so far:

- The full daily loop: scenario **intro → learn → speak (roleplay) → listening gym → cool-down**
- **FSRS-lite** spaced-repetition engine with comprehension + production cards
- **Speaking & listening** via the Web Speech API (TTS + on-device recognition), with a self-grading fallback where recognition isn't supported
- **Twenty Ecuador-flavored scenarios** across all four tiers, including a **"family & connection" cluster** built for the real goal — talking with relatives: family, meeting relatives, the *sobremesa*, a call with grandma, affection/goodbyes, catching up on news, and giving opinions warmly
- **Sentence Builder** — learn a productive frame ("Quiero ___", "¿Me puedes pasar ___?") and swap the ending to *generate your own* sentences (Michel Thomas + Pimsleur-inspired); its frames can be added into spaced repetition too. See [docs/METHODS.md](docs/METHODS.md)
- **Conversation mode** — run a whole scenario end-to-end as a continuous back-and-forth where you speak every one of your lines (the closest practice to a real chat)
- **Guided 7-day starter path** — an opinionated sequence from your first "hola" to holding a family conversation, so there's always a clear next step
- **Sounds** — pronunciation focus on the sounds that decide whether you're understood (pure vowels, the tap/trill r, ñ, throaty j, soft d, b=v, silent h, seseo), with minimal pairs
- **Vocabulary** — 15 thematic word packs (family, school, daily routine, house, food, body & health, clothing & colors, hobbies, jobs, the city, technology, nature, descriptions, emotions, calendar) you can browse, hear, and send into spaced repetition
- **Key verbs** — the eight highest-frequency verbs across **five tenses** (present, preterite, imperfect, future, conditional), with reference tables and an active-recall **quiz** over every verb/tense/form
- **Phrasebook** — every key phrase in one searchable, tap-to-hear list
- **Free-practice mode** + an in-lesson **"ES only" challenge toggle** (hide English to force recall)
- Progress dashboard (measured in *situations you can hold*, not points), a clean near-monochrome non-gamified UI, and on-device data with export/import

### Level

Michelle now spans **CEFR A1 → B1+ (≈ US high-school Spanish 1–4 / AP)**: ~600 lexical items and phrases, five verb tenses, and grammar from greetings through the preterite/imperfect, future, conditional, and reflexive verbs. The vocabulary library keeps growing toward full high-school breadth (~1,500 words).

Next per the roadmap: more vocabulary packs and scenarios toward B2, richer pronunciation practice, optional installable polish.

## Use it — no hosting required

The whole app is pre-built into one file you can just open:

**[`standalone/michelle.html`](standalone/michelle.html)** — download it and **double-click**. It opens in your default browser and runs entirely offline.

### Put it on your desktop as an icon
- **macOS:** drag `michelle.html` to your Desktop (or Dock). Double-click opens it in your browser. To make it feel like an app, open it in Chrome → ⋮ menu → *Cast, save & share* → *Install page as app…* (creates a real Dock icon in its own window).
- **Windows:** right-click `michelle.html` → *Send to* → *Desktop (create shortcut)*. Or open in Chrome/Edge → ⋮ → *Install Michelle* for a Start-menu app.

### Use it on your phone (for the car, etc.)
1. Get the file onto the phone (AirDrop, email it to yourself, or save it to your phone's Files / Downloads).
2. Open it with the browser. On Android Chrome you can open it from Downloads directly; on iPhone, open via the Files app → it launches in your browser.
3. In Chrome/Safari you can then *Add to Home Screen* for a one-tap icon.

> **Speaking practice is fullest in Chrome/Edge.** Text-to-speech (listening, shadowing) works everywhere. Speech *recognition* (scoring what you say) is Chromium/Safari-only and may be limited when opening a local `file://` — where it's unavailable, roleplay automatically falls back to "say it aloud, reveal, self-grade", so nothing breaks.

### Does my progress sync between phone and desktop?
**No — and that's normal.** Browser storage (localStorage/IndexedDB) is per-device and per-browser-profile; it is *not* synced by Chrome Sync or your Google account. On each device it persists across sessions indefinitely. To move progress, use **Settings → Export backup** on one device and **Import backup** on the other (a small JSON file).

## Rebuild it yourself (after editing content or code)

```bash
cd michelle
npm install               # isolated from Sink's pnpm workspace
npm run dev               # live dev server at http://localhost:5173
npm run build:standalone  # regenerate standalone/michelle.html
```
