import type { Scenario } from '@/content/types'

export const pasado: Scenario = {
  id: 'pasado',
  tier: 4,
  cefr: 'B1+',
  title: 'Contar lo que hiciste',
  goal: 'Tell someone about your day or trip in the past tense.',
  culture: 'Otavalo, north of Quito, has one of South America\'s most famous indigenous markets. "Llapingachos" are beloved Ecuadorian potato patties — a great thing to have tried and to talk about.',
  dialogue: [
    { id: 'x-1', speaker: 'them', es: '¿Qué hiciste ayer?', en: 'What did you do yesterday?' },
    { id: 'x-2', speaker: 'you', es: 'Fui a Otavalo y visité el mercado.', en: 'I went to Otavalo and visited the market.' },
    { id: 'x-3', speaker: 'them', es: '¡Qué bueno! ¿Y te gustó?', en: 'How nice! And did you like it?' },
    { id: 'x-4', speaker: 'you', es: 'Me encantó. Compré un poncho y comí muy rico.', en: 'I loved it. I bought a poncho and ate really well.' },
    { id: 'x-5', speaker: 'them', es: '¿Qué comiste?', en: 'What did you eat?' },
    { id: 'x-6', speaker: 'you', es: 'Comí llapingachos. Estuvieron deliciosos.', en: 'I ate llapingachos. They were delicious.' },
  ],
  chunks: [
    { id: 'x-c1', es: '¿Qué hiciste ayer?', en: 'What did you do yesterday?' },
    { id: 'x-c2', es: 'Fui a…', en: 'I went to…' },
    { id: 'x-c3', es: 'Me encantó', en: 'I loved it' },
    { id: 'x-c4', es: 'Compré…', en: 'I bought…' },
    { id: 'x-c5', es: '¿Qué comiste?', en: 'What did you eat?' },
  ],
  vocab: [
    { id: 'x-v1', es: 'ayer', en: 'yesterday', pos: 'adv.' },
    { id: 'x-v2', es: 'fui', en: 'I went / I was', pos: 'v.' },
    { id: 'x-v3', es: 'visité', en: 'I visited', pos: 'v.' },
    { id: 'x-v4', es: 'compré', en: 'I bought', pos: 'v.' },
    { id: 'x-v5', es: 'comí', en: 'I ate', pos: 'v.' },
    { id: 'x-v6', es: 'rico', en: 'tasty / delicious', pos: 'adj.' },
    { id: 'x-v7', es: 'el mercado', en: 'market', pos: 'n.' },
  ],
  grammarNote: 'This is the preterite (completed past). Regular "-ar" verbs end in -é/-aste (compré, compraste); "-er/-ir" in -í/-iste (comí, comiste). Two essentials are irregular and identical: ser and ir both become "fui" (I was / I went) — context tells them apart. "Hacer" → "hice / hiciste".',
  roleplay: [
    {
      id: 'x-r1',
      prompt: '¿Qué hiciste ayer?',
      promptEn: 'What did you do yesterday?',
      accept: ['fui a otavalo y visite el mercado', 'fui a otavalo', 'fui al mercado de otavalo'],
      hint: 'Say you went to Otavalo and visited the market.',
    },
    {
      id: 'x-r2',
      prompt: '¿Y te gustó?',
      promptEn: 'And did you like it?',
      accept: ['me encanto compre un poncho', 'me encanto', 'si me encanto'],
      hint: 'Say you loved it (and maybe what you bought).',
    },
    {
      id: 'x-r3',
      prompt: '¿Qué comiste?',
      promptEn: 'What did you eat?',
      accept: ['comi llapingachos', 'comi llapingachos estuvieron deliciosos', 'comi llapingachos muy ricos'],
      hint: 'Say you ate llapingachos.',
    },
  ],
  shadowing: ['x-1', 'x-2', 'x-4', 'x-6'],
}
