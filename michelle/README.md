# Michelle

**A conversational Spanish learning protocol and shareable web app — built to make you *speak*, not to make you collect streaks.**

Michelle is a deliberate reaction against the language apps that have failed most people: the ones that feel like slot machines, reward tapping over talking, and leave you with 400-day streaks but unable to order a coffee. The single goal here is **strong, confident conversational Spanish** — the ability to understand and be understood in real situations — not paper "fluency," not grammar-exam mastery, not points.

It is a **single shareable link**. Open it in any browser, on phone or laptop, send it to a friend. No extension, no app store, no login required, no backend. Everything runs client-side and saves to your device.

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

---

## Status

**Working MVP built** (Vite + Vue 3 + TS). Implemented so far:

- The full daily loop: scenario **intro → learn → speak (roleplay) → listening gym → cool-down**
- **FSRS-lite** spaced-repetition engine with comprehension + production cards
- **Speaking & listening** via the Web Speech API (TTS + on-device recognition), with a self-grading fallback where recognition isn't supported
- **Six Ecuador-flavored scenarios** (Tier 1 Survival + a Tier 2 taster): greetings, the *almuerzo*, the market, the corner store, taxis, and small talk
- Progress dashboard (measured in *situations you can hold*, not points), calm/editorial non-gamified UI, and on-device data with export/import

Next per the roadmap: more Tier 2–3 content, optional PWA/offline.

## Run it locally

```bash
cd michelle
npm install      # isolated from Sink's pnpm workspace
npm run dev      # http://localhost:5173
```

## Make it a shareable link

```bash
npm run build    # outputs a self-contained static site to michelle/dist/
```

`dist/` uses a **relative base + hash routing**, so it works on *any* static host — no server rewrite rules, no GitHub/Cloudflare lock-in:

- **Netlify / Vercel:** drag-and-drop the `dist/` folder, or connect the repo. You get an HTTPS link instantly.
- **Any web space / S3 / local:** just upload (or open) `dist/index.html`.

Anyone who opens the link gets their own independent on-device progress. No login, no extension, no app store.

> **Best in Chrome/Edge** for full speaking practice — speech *recognition* is Chromium/Safari-only. Text-to-speech and everything else works in all modern browsers; where recognition is missing, roleplay falls back to "say it, reveal, self-grade".
