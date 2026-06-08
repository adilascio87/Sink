// Content data model for Michelle. All learning content is authored as typed
// data (see src/content/es/) and bundled at build time, so the deployed app is
// fully self-contained — no backend, no API calls.

export type Tier = 1 | 2 | 3 | 4
export type Cefr = 'A1' | 'A2' | 'B1' | 'B1+'

export interface DialogueLine {
  id: string
  /** 'them' = the other person (played by the app), 'you' = the learner. */
  speaker: 'them' | 'you'
  es: string
  en: string
  /** Optional register / Ecuadorian regional note. */
  note?: string
}

export interface Chunk {
  id: string
  es: string
  en: string
  /** Optional word-for-word gloss to demystify the phrase. */
  literal?: string
}

export interface VocabItem {
  id: string
  es: string
  en: string
  pos?: string
}

/** A single step in the roleplay: the app says `prompt`, the learner replies. */
export interface RoleplayStep {
  id: string
  /** What the other person says (spoken via TTS). */
  prompt: string
  promptEn: string
  /** Acceptable learner responses (first is the "model" answer). */
  accept: string[]
  /** A short hint shown if the learner is stuck. */
  hint: string
}

export interface Scenario {
  id: string
  tier: Tier
  cefr: Cefr
  title: string
  /** What the learner will be able to do after this scenario. */
  goal: string
  /** Ecuador-specific cultural note shown before the dialogue. */
  culture?: string
  dialogue: DialogueLine[]
  chunks: Chunk[]
  vocab: VocabItem[]
  grammarNote?: string
  roleplay: RoleplayStep[]
  /** Dialogue line ids used in the listening / shadowing gym. */
  shadowing: string[]
}
