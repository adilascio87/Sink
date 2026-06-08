# Michelle — The Learning Protocol

This is the pedagogical heart of Michelle: *how* it teaches, *why* that works, and *what* the learner does every day. The target outcome is **strong conversational Spanish** — understanding real speech and producing it under the light pressure of a real exchange — beginning with a **neutral Latin American** variety (the most broadly useful starting point; regional notes are surfaced where they matter).

---

## 1. Operating principles

1. **Communicative first, grammar as support.** Grammar is taught *just-in-time* to explain a phrase you already need — never as the front door. You learn "¿Me puede traer la cuenta?" as a usable chunk first; the "puede + infinitive" pattern is explained second.
2. **Chunks over words.** The unit of learning is the **lexical chunk** (a fixed or semi-fixed phrase), because fluent speech is assembled from chunks, not built word-by-word from grammar rules.
3. **Frequency rules the curriculum.** Effort is spent on the highest-leverage language first. Roughly 1,000 well-chosen words + a few hundred chunks carry the majority of everyday conversation.
4. **Production is non-negotiable.** Every session ends with the learner *saying* something out loud. Recognition is necessary but never sufficient.
5. **Comprehensible input at i+1.** New material is mostly understandable from context, with a small, deliberate layer of new language on top.
6. **Spacing beats cramming.** Review is scheduled by an SRS so memory is reinforced exactly as it's about to fade.
7. **No artificial guilt.** Streaks exist only as gentle continuity, never as a loss-aversion trap. Progress is framed as *competence gained*, not points banked.

---

## 2. The daily loop (~30–35 min, scalable down to 10)

A single session is a fixed, repeatable ritual so there are no decisions to make and no friction to start:

| Phase | Time | What happens | Pillar |
| --- | --- | --- | --- |
| **1. Warm-up review** | ~5 min | Clear today's SRS-due vocab/chunk cards. Active recall, speaking the answer aloud. | SRS |
| **2. New scenario (input)** | ~8 min | Meet a real situation as a natural dialogue. Hear it at native speed (TTS), then with support (slowed + glossed). Comprehensible input + new chunks introduced. | Roleplay / Listening |
| **3. Production (roleplay)** | ~10 min | Play one role in the dialogue. Branching prompts ask you to *produce* responses; speech recognition checks your spoken answer. | Roleplay / Speaking |
| **4. Listening gym** | ~5 min | Native-paced audio of the day's language + **shadowing** (hear → immediately repeat). Trains the ear and the mouth together. | Listening / Speaking |
| **5. Cool-down** | ~2 min | Quick self-assessment ("could you say this for real?"), new cards scheduled, next session previewed. | SRS |

A **short mode** (10 min) collapses to: review → one roleplay turn → shadow three lines. The ritual never breaks, it just shrinks.

---

## 3. The curriculum: scenarios in four tiers

Content is organized by **communicative scenario**, not by grammar topic. Scenarios are grouped into four ascending tiers. Finishing Tier 3 corresponds roughly to **CEFR A2→B1** — the point where you can genuinely hold a conversation.

### Tier 1 — Survival (≈ A1)
The non-negotiables for not being stuck.
Greetings & introductions · Numbers, prices, time · Ordering food & drink · Directions & transport · Shopping basics · Yes/no/clarification ("¿Puede repetir?")

### Tier 2 — Social (≈ A1→A2)
Connecting with people.
Small talk & where you're from · Family & work · Likes/dislikes & opinions · Making plans · On the phone / messaging · Feelings & well-being

### Tier 3 — Situational (≈ A2→B1)
Handling life when it gets specific.
Doctor / pharmacy · Renting / accommodation · Problems & complaints · Banking & errands · Describing past events · Hypotheticals & plans ("si pudiera…")

### Tier 4 — Fluency builders (≈ B1+)
Sounding like a person, not a phrasebook.
Storytelling & anecdotes · Debate & persuasion · Idioms & register (formal/informal, regional) · Fast colloquial listening · Cultural nuance

Each **scenario** contains: a core dialogue (6–12 lines), a target chunk set (5–10), a target vocab set (10–20), a grammar "just-in-time" note, a roleplay branch tree, and a shadowing set.

---

## 4. The spaced-repetition engine

- Algorithm: **FSRS-lite** (a simplified Free Spaced Repetition Scheduler) — more accurate intervals than classic SM-2, but light enough to run fully in the browser.
- Card types: **comprehension** (Spanish → meaning), **production** (meaning → spoken Spanish, checked by speech recognition), and **listening** (audio → meaning).
- Grading is 4-button (Again / Hard / Good / Easy); production and listening cards can be auto-graded by speech recognition with manual override.
- New cards are introduced *from the scenarios you've actually done*, so review is always tied to context — never naked flashcards.

---

## 5. How "speaking & listening" works without any paid service

Everything uses the browser's built-in **Web Speech API**:

- **Listening** → `speechSynthesis` reads dialogue and cards in a Spanish voice; rate is adjustable (native → slowed) for the listening gym and shadowing.
- **Speaking** → `SpeechRecognition` (where supported, e.g. Chromium/Safari) transcribes what the learner says and compares it to the target, giving a simple similarity/pronunciation score.
- **Graceful fallback** → on browsers without speech recognition, production cards fall back to "say it, then reveal and self-grade," so the app still works everywhere.

No microphone audio ever leaves the device; recognition is on-device via the browser. This keeps the privacy story clean and the "just a link" promise intact.

---

## 6. Measuring real progress (not points)

Success is defined in conversational terms, surfaced on a simple dashboard:

- **Active chunk count** — phrases you can *produce*, not just recognize.
- **Scenario coverage** — which real situations you can currently handle end-to-end.
- **Speaking attempts & accuracy** — how much you've actually spoken, and trend.
- **Listening level** — comprehension at slowed vs. native speed.
- **Retention health** — SRS recall rate over time.

The headline metric is deliberately human: *"Situations you can hold a conversation in."*
