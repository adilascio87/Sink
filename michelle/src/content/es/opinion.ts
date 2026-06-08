import type { Scenario } from '@/content/types'

export const opinion: Scenario = {
  id: 'opinion',
  tier: 4,
  cefr: 'B1',
  title: 'Dar tu opinión',
  goal: 'Give an opinion, agree, and disagree warmly — without being abrupt.',
  culture: 'Ecuadorians soften disagreement; you rarely flatly contradict someone. "Te entiendo, pero…" and "cada quien con su gusto" let you differ while keeping things warm.',
  dialogue: [
    { id: 'op-1', speaker: 'them', es: '¿Qué piensas de la comida ecuatoriana?', en: 'What do you think of Ecuadorian food?' },
    { id: 'op-2', speaker: 'you', es: 'Creo que es deliciosa, sobre todo el ceviche.', en: 'I think it\'s delicious, especially the ceviche.' },
    { id: 'op-3', speaker: 'them', es: '¿Verdad que sí? ¿Y qué tal el clima?', en: 'Right? And how about the weather?' },
    { id: 'op-4', speaker: 'you', es: 'La verdad, prefiero el clima de la costa.', en: 'Honestly, I prefer the coast\'s weather.' },
    { id: 'op-5', speaker: 'them', es: 'Te entiendo, pero a mí me gusta más la sierra.', en: 'I get you, but I like the highlands more.' },
    { id: 'op-6', speaker: 'you', es: 'Cada quien con su gusto, ¿no?', en: 'To each their own, right?' },
  ],
  chunks: [
    { id: 'op-c1', es: '¿Qué piensas de…?', en: 'What do you think of…?' },
    { id: 'op-c2', es: 'Creo que…', en: 'I think that…' },
    { id: 'op-c3', es: 'La verdad…', en: 'Honestly… / The truth is…' },
    { id: 'op-c4', es: 'Te entiendo, pero…', en: 'I get you, but…' },
    { id: 'op-c5', es: 'Cada quien con su gusto', en: 'To each their own' },
  ],
  vocab: [
    { id: 'op-v1', es: 'pensar', en: 'to think', pos: 'v.' },
    { id: 'op-v2', es: 'creer', en: 'to believe / think', pos: 'v.' },
    { id: 'op-v3', es: 'preferir', en: 'to prefer', pos: 'v.' },
    { id: 'op-v4', es: 'sobre todo', en: 'especially', pos: 'phrase' },
    { id: 'op-v5', es: 'entender', en: 'to understand', pos: 'v.' },
    { id: 'op-v6', es: 'el gusto', en: 'taste / preference', pos: 'n.' },
    { id: 'op-v7', es: 'la costa', en: 'the coast', pos: 'n.' },
  ],
  grammarNote: 'Opinions use "creo que / pienso que" + normal (indicative) verb: "creo que es buena". "Preferir" changes its stem: prefiero, prefieres, prefiere. To disagree kindly, lead with agreement: "te entiendo, pero…" or "puede ser, pero yo…".',
  roleplay: [
    {
      id: 'op-r1',
      prompt: '¿Qué piensas de la comida ecuatoriana?',
      promptEn: 'What do you think of Ecuadorian food?',
      accept: ['creo que es deliciosa sobre todo el ceviche', 'creo que es deliciosa', 'pienso que es deliciosa'],
      hint: 'Say you think it\'s delicious (and name a favorite).',
    },
    {
      id: 'op-r2',
      prompt: '¿Y qué tal el clima?',
      promptEn: 'And how about the weather?',
      accept: ['la verdad prefiero el clima de la costa', 'prefiero el clima de la costa', 'la verdad prefiero la costa'],
      hint: 'Give your honest preference.',
    },
    {
      id: 'op-r3',
      prompt: 'A mí me gusta más la sierra.',
      promptEn: 'I like the highlands more.',
      accept: ['cada quien con su gusto', 'cada quien con su gusto no', 'te entiendo cada quien con su gusto'],
      hint: 'Close it warmly: "to each their own".',
    },
  ],
  shadowing: ['op-1', 'op-2', 'op-4'],
}
