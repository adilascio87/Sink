# Methods & influences

Michelle isn't a clone of any one app — it borrows the *techniques that have the most evidence behind them* for reaching real conversational ability, and deliberately leaves out the parts that feel productive but aren't (endless streaks, tap-the-tiles recognition, gamified pressure). Here's what we drew from and where it lives in the app.

| Influence | The core idea | Where it lives in Michelle |
| --- | --- | --- |
| **Comprehensible input** (Krashen) | You acquire language by understanding messages slightly above your level (*i+1*), not by drilling rules. | Every scenario opens with a natural dialogue you hear and read before producing anything. Grammar is "just-in-time", never the front door. |
| **The lexical approach / chunks** (Lewis) | Fluent speech is assembled from memorized multi-word phrases, not built word-by-word from grammar. | "Key phrases" (chunks) are first-class learning items, reviewed as their own cards. |
| **Spaced repetition & the forgetting curve** (Ebbinghaus → SM-2 → FSRS) | Reviewing just as a memory starts to fade is dramatically more efficient than cramming. | The FSRS-lite scheduler (`lib/srs.ts`) with per-card stability/difficulty. |
| **Active recall & the production effect** | Recognizing isn't knowing; *producing* a word out loud cements it far better. | Every item has a **production** card (meaning → spoken Spanish), and every lesson ends with speaking. |
| **Pimsleur** | Graduated-interval recall + *anticipation*: you're prompted to say the answer before hearing the model. | The roleplay phase (say your line before the model is revealed) and the Sentence Builder's "hear & repeat". |
| **Michel Thomas** | No notebooks, no memorization pressure — build novel sentences from a few productive frames so you can say things you've never been taught. | The **Sentence Builder**: learn a frame ("Quiero ___"), swap the slot, generate your own sentences. |
| **Shadowing / Glossika** | Listening to and immediately repeating native-paced audio trains the ear and the mouth together. | The **Listening gym**: hear each line at natural then slowed speed and repeat. |
| **Speaking-first, output-focused tutoring** | Time-to-speaking matters more than vocabulary breadth; conversation is the goal and the practice. | The whole app is organized around situations you can *hold a conversation in*, scored by speaking attempts, not points. |

## What we intentionally left out

- **Streaks as loss-aversion.** A gentle day count exists; there's no guilt mechanic, no "you'll lose your streak" pressure.
- **Cartoon gamification, mascots, confetti, leagues.** The UI is quiet and adult so attention goes to the language.
- **Translation-only recognition drills.** Pure "tap the matching tile" exercises teach recognition that doesn't transfer to speech.
- **A live AI tutor (for now).** It would need an API key and a backend, breaking the "one self-contained file, no hosting" promise. Parked as an optional future add-on.

## The result: one tight daily loop

Review (spaced repetition) → meet a real situation (comprehensible input + chunks) → say it (anticipation + production) → shadow it (listening) → optionally build your own sentences (Michel Thomas frames). Each pass is short, ends with you speaking, and is tuned for the one outcome that matters here: **talking with your family in Spanish.**
