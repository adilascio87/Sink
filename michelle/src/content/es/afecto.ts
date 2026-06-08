import type { Scenario } from '@/content/types'

export const afecto: Scenario = {
  id: 'afecto',
  tier: 2,
  cefr: 'A2',
  title: 'Cariño y despedidas',
  goal: 'Express that you love and miss your family, and say a warm goodbye.',
  culture: 'Latin American families are openly affectionate. "Te quiero" (I love you) is used freely with family and friends; "te amo" is stronger and usually romantic. Goodbyes carry hugs, kisses, and greetings for everyone.',
  dialogue: [
    { id: 'af-1', speaker: 'them', es: 'Te extrañamos mucho por aquí.', en: 'We miss you a lot here.' },
    { id: 'af-2', speaker: 'you', es: 'Yo también los extraño. Los quiero un montón.', en: 'I miss you all too. I love you guys so much.' },
    { id: 'af-3', speaker: 'them', es: '¿Cuándo te volvemos a ver?', en: 'When will we see you again?' },
    { id: 'af-4', speaker: 'you', es: 'Espero que pronto. Les mando muchos saludos.', en: 'I hope soon. I send you all my best.' },
    { id: 'af-5', speaker: 'them', es: 'Dale un abrazo a todos de mi parte.', en: 'Give everyone a hug for me.' },
    { id: 'af-6', speaker: 'you', es: 'Claro que sí. Un beso, cuídense.', en: 'Of course. A kiss, take care (you all).' },
  ],
  chunks: [
    { id: 'af-c1', es: 'Te extrañamos mucho', en: 'We miss you a lot' },
    { id: 'af-c2', es: 'Los quiero un montón', en: 'I love you all so much' },
    { id: 'af-c3', es: 'Espero que pronto', en: 'I hope soon' },
    { id: 'af-c4', es: 'de mi parte', en: 'on my behalf / from me' },
    { id: 'af-c5', es: 'Un beso, cuídense', en: 'A kiss, take care (you all)' },
  ],
  vocab: [
    { id: 'af-v1', es: 'extrañar', en: 'to miss', pos: 'v.' },
    { id: 'af-v2', es: 'querer', en: 'to love (people)', pos: 'v.' },
    { id: 'af-v3', es: 'un montón', en: 'a ton / a lot', pos: 'phrase' },
    { id: 'af-v4', es: 'el saludo', en: 'greeting / regards', pos: 'n.' },
    { id: 'af-v5', es: 'el beso', en: 'kiss', pos: 'n.' },
    { id: 'af-v6', es: 'volver', en: 'to return', pos: 'v.' },
    { id: 'af-v7', es: 'cuídense', en: 'take care (you all)', pos: 'v.' },
  ],
  grammarNote: '"Te quiero" (one person, informal) vs "los quiero" (you all). "Un montón" is a friendly way to say "a lot". "Espero que" technically takes the subjunctive, but "espero que pronto" works as a warm fixed phrase. "Cuídense" is the "take care" you say to a group.',
  roleplay: [
    {
      id: 'af-r1',
      prompt: 'Te extrañamos mucho por aquí.',
      promptEn: 'We miss you a lot here.',
      accept: ['yo tambien los extraño los quiero un monton', 'yo tambien los extraño', 'los extraño los quiero un monton'],
      hint: 'Say you miss them and love them too.',
    },
    {
      id: 'af-r2',
      prompt: '¿Cuándo te volvemos a ver?',
      promptEn: 'When will we see you again?',
      accept: ['espero que pronto les mando muchos saludos', 'espero que pronto', 'pronto espero les mando saludos'],
      hint: 'Say you hope soon and send your regards.',
    },
    {
      id: 'af-r3',
      prompt: 'Dale un abrazo a todos de mi parte.',
      promptEn: 'Give everyone a hug for me.',
      accept: ['claro que si un beso cuidense', 'claro que si', 'claro un beso cuidense'],
      hint: 'Agree and say a warm goodbye.',
    },
  ],
  shadowing: ['af-1', 'af-2', 'af-4', 'af-6'],
}
