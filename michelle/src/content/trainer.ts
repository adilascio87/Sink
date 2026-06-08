// Content for the Conjugation Trainer: which verbs to drill, plain-language
// guidance on when each tense is used, and a focused preterite-vs-imperfect set
// (the hardest contrast for English speakers).

import type { Tense } from '@/lib/conjugate'

export interface TrainerVerb {
  infinitive: string
  en: string
}

// A mix of regular (-ar/-er/-ir) and high-frequency irregular verbs. The engine
// conjugates them all; irregulars are handled inside lib/conjugate.
export const trainerVerbs: TrainerVerb[] = [
  { infinitive: 'hablar', en: 'to speak' },
  { infinitive: 'trabajar', en: 'to work' },
  { infinitive: 'estudiar', en: 'to study' },
  { infinitive: 'comprar', en: 'to buy' },
  { infinitive: 'comer', en: 'to eat' },
  { infinitive: 'aprender', en: 'to learn' },
  { infinitive: 'vivir', en: 'to live' },
  { infinitive: 'escribir', en: 'to write' },
  { infinitive: 'ser', en: 'to be (identity)' },
  { infinitive: 'estar', en: 'to be (state)' },
  { infinitive: 'ir', en: 'to go' },
  { infinitive: 'tener', en: 'to have' },
  { infinitive: 'hacer', en: 'to do / make' },
  { infinitive: 'poder', en: 'can / to be able' },
  { infinitive: 'querer', en: 'to want' },
  { infinitive: 'venir', en: 'to come' },
  { infinitive: 'decir', en: 'to say' },
]

export interface TenseGuide {
  id: Tense
  name: string
  when: string
  example: string
}

export const tenseGuides: TenseGuide[] = [
  {
    id: 'present',
    name: 'Present',
    when: 'Habitual actions and what is happening now.',
    example: 'Hablo español todos los días. — I speak Spanish every day.',
  },
  {
    id: 'preterite',
    name: 'Preterite',
    when: 'A completed action at a specific point in the past. Think "what happened".',
    example: 'Ayer hablé con mi abuela. — Yesterday I spoke with my grandma.',
  },
  {
    id: 'imperfect',
    name: 'Imperfect',
    when: 'Ongoing, repeated, or background past — "used to" / "was —ing". Think "what was going on".',
    example: 'De niño hablaba con ella cada domingo. — As a kid I used to talk with her every Sunday.',
  },
  {
    id: 'future',
    name: 'Future',
    when: 'What will happen. (In speech, "voy a hablar" is the easy everyday future.)',
    example: 'Mañana hablaré con ella. — Tomorrow I will speak with her.',
  },
  {
    id: 'conditional',
    name: 'Conditional',
    when: 'What would happen, and polite requests.',
    example: 'Me gustaría hablar contigo. — I would like to speak with you.',
  },
]

export interface ContrastItem {
  sentence: string
  en: string
  options: [string, string]
  answer: string
  why: string
}

// Preterite vs imperfect — pick the form that fits the context.
export const contrastItems: ContrastItem[] = [
  {
    sentence: 'Ayer ___ ceviche.',
    en: 'Yesterday I ate ceviche.',
    options: ['comí', 'comía'],
    answer: 'comí',
    why: '"Ayer" marks one finished moment → preterite.',
  },
  {
    sentence: 'Cuando era niño, ___ en Quito.',
    en: 'When I was a kid, I lived in Quito.',
    options: ['viví', 'vivía'],
    answer: 'vivía',
    why: 'A lasting situation/background in the past → imperfect.',
  },
  {
    sentence: '___ las tres cuando llegó.',
    en: 'It was three o\'clock when he arrived.',
    options: ['Fue', 'Era'],
    answer: 'Era',
    why: 'Telling time in the past → imperfect.',
  },
  {
    sentence: 'El año pasado ___ a mi familia.',
    en: 'Last year I visited my family.',
    options: ['visité', 'visitaba'],
    answer: 'visité',
    why: '"El año pasado" = a finished period → preterite.',
  },
  {
    sentence: 'Todos los días ___ a la escuela.',
    en: 'Every day I used to walk to school.',
    options: ['caminé', 'caminaba'],
    answer: 'caminaba',
    why: 'A repeated past habit → imperfect.',
  },
  {
    sentence: 'De repente, ___ el teléfono.',
    en: 'Suddenly, the phone rang.',
    options: ['sonó', 'sonaba'],
    answer: 'sonó',
    why: 'A sudden, completed event → preterite.',
  },
  {
    sentence: 'Mientras ___, escuchaba música.',
    en: 'While I was cooking, I was listening to music.',
    options: ['cociné', 'cocinaba'],
    answer: 'cocinaba',
    why: '"Mientras" + an ongoing action → imperfect.',
  },
  {
    sentence: 'Anoche ___ una película.',
    en: 'Last night I watched a movie.',
    options: ['vi', 'veía'],
    answer: 'vi',
    why: '"Anoche" = one finished event → preterite.',
  },
]
