import type { Scenario } from '@/content/types'

export const futuro: Scenario = {
  id: 'futuro',
  tier: 3,
  cefr: 'B1',
  title: 'Planes a futuro',
  goal: 'Talk about your plans — including visiting family — and when you\'ll go.',
  culture: 'In Ecuador "las fiestas" usually means the December holidays, when families gather. Saying you\'ll come "para las fiestas" lands warmly.',
  dialogue: [
    { id: 'fu-1', speaker: 'them', es: '¿Qué planes tienes para este año?', en: 'What plans do you have for this year?' },
    { id: 'fu-2', speaker: 'you', es: 'Voy a visitar a mi familia en Ecuador.', en: 'I\'m going to visit my family in Ecuador.' },
    { id: 'fu-3', speaker: 'them', es: '¡Qué bueno! ¿Cuándo piensas ir?', en: 'How nice! When are you planning to go?' },
    { id: 'fu-4', speaker: 'you', es: 'Pienso ir en diciembre, para las fiestas.', en: 'I plan to go in December, for the holidays.' },
    { id: 'fu-5', speaker: 'them', es: '¿Y te vas a quedar mucho tiempo?', en: 'And are you going to stay long?' },
    { id: 'fu-6', speaker: 'you', es: 'Espero quedarme un mes. Cuando vaya, quiero conocer la costa.', en: 'I hope to stay a month. When I go, I want to see the coast.' },
  ],
  chunks: [
    { id: 'fu-c1', es: '¿Qué planes tienes?', en: 'What plans do you have?' },
    { id: 'fu-c2', es: 'Voy a…', en: 'I\'m going to…' },
    { id: 'fu-c3', es: '¿Cuándo piensas…?', en: 'When are you planning to…?' },
    { id: 'fu-c4', es: 'para las fiestas', en: 'for the holidays' },
    { id: 'fu-c5', es: 'Cuando vaya…', en: 'When I go…' },
  ],
  vocab: [
    { id: 'fu-v1', es: 'el plan', en: 'plan', pos: 'n.' },
    { id: 'fu-v2', es: 'pensar', en: 'to plan / intend', pos: 'v.' },
    { id: 'fu-v3', es: 'quedarse', en: 'to stay', pos: 'v.' },
    { id: 'fu-v4', es: 'el mes', en: 'month', pos: 'n.' },
    { id: 'fu-v5', es: 'diciembre', en: 'December', pos: 'n.' },
    { id: 'fu-v6', es: 'las fiestas', en: 'the holidays', pos: 'n.' },
    { id: 'fu-v7', es: 'conocer', en: 'to get to know / see', pos: 'v.' },
  ],
  grammarNote: 'Two easy ways to talk about the future: "ir a" + infinitive ("voy a visitar") and "pensar" + infinitive for intentions ("pienso ir"). "Cuando vaya" uses the subjunctive because it\'s a future "when" — learn it as a fixed opener for now.',
  roleplay: [
    {
      id: 'fu-r1',
      prompt: '¿Qué planes tienes para este año?',
      promptEn: 'What plans do you have for this year?',
      accept: ['voy a visitar a mi familia en ecuador', 'voy a visitar a mi familia', 'pienso visitar a mi familia'],
      hint: 'Say you\'re going to visit your family.',
    },
    {
      id: 'fu-r2',
      prompt: '¿Cuándo piensas ir?',
      promptEn: 'When are you planning to go?',
      accept: ['pienso ir en diciembre para las fiestas', 'en diciembre para las fiestas', 'pienso ir en diciembre'],
      hint: 'Say December, for the holidays.',
    },
    {
      id: 'fu-r3',
      prompt: '¿Te vas a quedar mucho tiempo?',
      promptEn: 'Are you going to stay long?',
      accept: ['espero quedarme un mes', 'espero quedarme un mes cuando vaya quiero conocer la costa', 'un mes espero'],
      hint: 'Say you hope to stay a month.',
    },
  ],
  shadowing: ['fu-2', 'fu-4', 'fu-6'],
}
