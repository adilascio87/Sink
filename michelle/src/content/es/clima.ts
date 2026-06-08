import type { Scenario } from '@/content/types'

export const clima: Scenario = {
  id: 'clima',
  tier: 2,
  cefr: 'A2',
  title: 'El clima y cómo te sientes',
  goal: 'Talk about the weather and how you\'re feeling.',
  culture: 'Ecuador\'s weather depends on the region: the sierra (highlands) is cool, the costa is hot. A warm Ecuadorian morning greeting is "¿Cómo amaneciste?" — literally "how did you wake up?".',
  dialogue: [
    { id: 'w-1', speaker: 'them', es: '¿Cómo amaneciste?', en: 'How are you this morning?' },
    { id: 'w-2', speaker: 'you', es: 'Bien, gracias. Aunque hace un poco de frío.', en: 'Good, thanks. Although it\'s a little cold.' },
    { id: 'w-3', speaker: 'them', es: 'Sí, en la sierra siempre hace fresco en la mañana.', en: 'Yes, in the highlands it\'s always cool in the morning.' },
    { id: 'w-4', speaker: 'you', es: '¿Va a llover hoy?', en: 'Is it going to rain today?' },
    { id: 'w-5', speaker: 'them', es: 'Creo que sí, está nublado.', en: 'I think so, it\'s cloudy.' },
    { id: 'w-6', speaker: 'you', es: 'Entonces llevo paraguas.', en: 'Then I\'ll take an umbrella.' },
  ],
  chunks: [
    { id: 'w-c1', es: '¿Cómo amaneciste?', en: 'How are you this morning?' },
    { id: 'w-c2', es: 'hace frío / hace calor', en: 'it\'s cold / it\'s hot' },
    { id: 'w-c3', es: '¿Va a llover?', en: 'Is it going to rain?' },
    { id: 'w-c4', es: 'está nublado', en: 'it\'s cloudy' },
    { id: 'w-c5', es: 'creo que sí', en: 'I think so' },
  ],
  vocab: [
    { id: 'w-v1', es: 'el frío', en: 'cold', pos: 'n.' },
    { id: 'w-v2', es: 'el calor', en: 'heat', pos: 'n.' },
    { id: 'w-v3', es: 'llover', en: 'to rain', pos: 'v.' },
    { id: 'w-v4', es: 'nublado', en: 'cloudy', pos: 'adj.' },
    { id: 'w-v5', es: 'el paraguas', en: 'umbrella', pos: 'n.' },
    { id: 'w-v6', es: 'la sierra', en: 'highlands', pos: 'n.' },
    { id: 'w-v7', es: 'fresco', en: 'cool / fresh', pos: 'adj.' },
  ],
  grammarNote: 'Weather usually uses "hacer": "hace frío / calor / sol / viento". But cloudiness uses "estar": "está nublado". For the near future, use "ir a" + infinitive: "va a llover" (it\'s going to rain), "voy a llevar" (I\'m going to take).',
  roleplay: [
    {
      id: 'w-r1',
      prompt: '¿Cómo amaneciste?',
      promptEn: 'How are you this morning?',
      accept: ['bien gracias aunque hace un poco de frio', 'bien gracias', 'bien gracias hace frio'],
      hint: 'Say you\'re good, but mention it\'s a bit cold.',
    },
    {
      id: 'w-r2',
      prompt: 'Hoy hace bastante calor, ¿no?',
      promptEn: 'It\'s pretty hot today, right?',
      accept: ['si hace mucho calor', 'si bastante calor', 'si hace calor'],
      hint: 'Agree that it\'s hot.',
    },
    {
      id: 'w-r3',
      prompt: 'Creo que sí, está nublado.',
      promptEn: 'I think so, it\'s cloudy.',
      accept: ['entonces llevo paraguas', 'entonces llevo un paraguas', 'voy a llevar paraguas'],
      hint: 'Say then you\'ll take an umbrella.',
    },
  ],
  shadowing: ['w-1', 'w-2', 'w-4'],
}
