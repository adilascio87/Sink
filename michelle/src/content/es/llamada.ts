import type { Scenario } from '@/content/types'

export const llamada: Scenario = {
  id: 'llamada',
  tier: 2,
  cefr: 'A2',
  title: 'Una llamada a la abuela',
  goal: 'Have a short, warm phone call with a grandparent.',
  culture: 'Ecuadorians answer the phone with "¿Aló?". Grandparents are usually addressed with "usted" out of respect and affection. Calls end with hugs and blessings, not a quick "bye".',
  dialogue: [
    { id: 'll-1', speaker: 'them', es: '¿Aló? ¿Cómo estás, mijo?', en: 'Hello? How are you, dear?' },
    { id: 'll-2', speaker: 'you', es: 'Hola, abuela. Todo bien, ¿y usted cómo está?', en: 'Hi, grandma. All good, and how are you?' },
    { id: 'll-3', speaker: 'them', es: 'Aquí, extrañándote. ¿Cuándo vienes a visitarnos?', en: 'Here, missing you. When are you coming to visit us?' },
    { id: 'll-4', speaker: 'you', es: 'Pronto, abuela. La llamo la próxima semana.', en: 'Soon, grandma. I\'ll call you next week.' },
    { id: 'll-5', speaker: 'them', es: 'Cuídate mucho. Te mando un abrazo.', en: 'Take good care. I send you a hug.' },
    { id: 'll-6', speaker: 'you', es: 'Yo también la quiero. Chao, abuela.', en: 'I love you too. Bye, grandma.' },
  ],
  chunks: [
    { id: 'll-c1', es: '¿Aló?', en: 'Hello? (on the phone)' },
    { id: 'll-c2', es: '¿Cuándo vienes a visitarnos?', en: 'When are you coming to visit us?' },
    { id: 'll-c3', es: 'La llamo la próxima semana', en: 'I\'ll call you next week (formal)' },
    { id: 'll-c4', es: 'Te mando un abrazo', en: 'I send you a hug' },
    { id: 'll-c5', es: 'Yo también la quiero', en: 'I love you too (formal)' },
  ],
  vocab: [
    { id: 'll-v1', es: 'la abuela', en: 'grandmother', pos: 'n.' },
    { id: 'll-v2', es: 'el abuelo', en: 'grandfather', pos: 'n.' },
    { id: 'll-v3', es: 'visitar', en: 'to visit', pos: 'v.' },
    { id: 'll-v4', es: 'pronto', en: 'soon', pos: 'adv.' },
    { id: 'll-v5', es: 'el abrazo', en: 'hug', pos: 'n.' },
    { id: 'll-v6', es: 'cuidarse', en: 'to take care', pos: 'v.' },
    { id: 'll-v7', es: 'la semana', en: 'week', pos: 'n.' },
  ],
  grammarNote: '"Querer" means "to love" with people: "te quiero" (informal) / "la quiero" (formal, to your grandma). "Venir a + infinitive" = "to come to do something". With grandparents, keep "usted": "¿cómo está usted?", "la llamo", "cuídese".',
  roleplay: [
    {
      id: 'll-r1',
      prompt: '¿Aló? ¿Cómo estás, mijo?',
      promptEn: 'Hello? How are you, dear?',
      accept: ['hola abuela todo bien y usted como esta', 'hola abuela todo bien', 'todo bien abuela y usted'],
      hint: 'Greet grandma, say you\'re good, ask how she is (usted).',
    },
    {
      id: 'll-r2',
      prompt: '¿Cuándo vienes a visitarnos?',
      promptEn: 'When are you coming to visit us?',
      accept: ['pronto abuela la llamo la proxima semana', 'pronto abuela', 'pronto la llamo la proxima semana'],
      hint: 'Say "soon" and that you\'ll call next week.',
    },
    {
      id: 'll-r3',
      prompt: 'Cuídate mucho. Te mando un abrazo.',
      promptEn: 'Take care. I send you a hug.',
      accept: ['yo tambien la quiero chao abuela', 'yo tambien la quiero', 'la quiero mucho chao abuela'],
      hint: 'Say you love her too and say bye.',
    },
  ],
  shadowing: ['ll-2', 'll-4', 'll-6'],
}
