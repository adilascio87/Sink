# Michelle — Build Roadmap

Milestones are ordered so there's something *usable* as early as possible, and so the conversational core (speaking, listening, roleplay, SRS) is proven before content is scaled up.

| # | Milestone | Deliverable | Done when… |
| --- | --- | --- | --- |
| **M0** | **Plan** *(this document)* | Protocol + architecture + roadmap | You approve or amend it. |
| **M1** | App skeleton | Vite+Vue+TS project, design system (calm/editorial theme), routing, all six screens stubbed, Dexie persistence wired | You can click through every screen; settings persist across reloads. |
| **M2** | SRS engine | FSRS-lite scheduler + Review screen + card types (comprehension/production/listening) | Cards schedule, surface when due, and grade correctly. |
| **M3** | Speech + scenario player | Web Speech wrapper (TTS, recognition, graceful fallback) + the 5-phase scenario loop incl. roleplay branches and shadowing | You can complete a full daily loop for one scenario, speaking aloud. |
| **M4** | First Spanish content pack | Tier 1 "Survival" — ~10 complete scenarios (dialogues, chunks, vocab, roleplay, shadowing) | You can actually learn and practice survival Spanish end-to-end. |
| **M5** | Progress + deploy | Competence dashboard + production build deployed as a shareable HTTPS link (Cloudflare/GitHub Pages) | You have a URL you can open and send to someone. |
| **M6** | Expansion & polish | Tiers 2–3 content, data export/import, optional PWA/offline | Coverage reaches ~A2→B1; installable & offline. |
| **M7** *(optional)* | AI conversation partner | Opt-in live tutor (requires user-supplied API key + minimal backend) | Only if you decide the static-link tradeoff is worth it. |

## Sequencing notes

- **M1–M3 build the engine; M4 fills it with Spanish.** This means the speaking/listening/SRS machinery is validated on a tiny bit of content before investing in a full curriculum.
- Each milestone ends in a working, committed, pushable state on the `claude/spanish-learning-app-vwCt1` branch.
- Content (M4, M6) is authored as data files, so adding scenarios — or later, other languages — never requires touching the engine.

## Open decisions for you

1. **Spanish variety** — default is neutral **Latin American**; say the word if you'd rather start with **Castilian (Spain)**.
2. **Deploy target** — **Cloudflare Pages** vs **GitHub Pages** for the shareable link (either works; Cloudflare matches the Sink ecosystem).
3. **Repo split** — keep `michelle/` inside this repo for now (only option from this session), or, once you're on a normal terminal, split it into its own GitHub repo. The folder is structured to make that a one-command operation.
