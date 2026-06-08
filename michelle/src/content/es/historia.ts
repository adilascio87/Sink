import type { Scenario } from '@/content/types'

export const historia: Scenario = {
  id: 'historia',
  tier: 4,
  cefr: 'B1+',
  title: 'Ponerse al día',
  goal: 'Catch up on news and react to a story the way people really do.',
  culture: 'Family conversations live on storytelling. Reactions matter as much as the story — "¿en serio?", "¡no lo puedo creer!" keep the other person going. "Resulta que…" is how you launch into news.',
  dialogue: [
    { id: 'hi-1', speaker: 'them', es: '¿Sabes qué pasó la semana pasada?', en: 'Do you know what happened last week?' },
    { id: 'hi-2', speaker: 'you', es: 'No, cuéntame. ¿Qué pasó?', en: 'No, tell me. What happened?' },
    { id: 'hi-3', speaker: 'them', es: 'Resulta que mi hermano se casó.', en: 'It turns out my brother got married.' },
    { id: 'hi-4', speaker: 'you', es: '¿En serio? ¡No lo puedo creer!', en: 'Really? I can\'t believe it!' },
    { id: 'hi-5', speaker: 'them', es: 'Sí, y al final hicieron una fiesta enorme.', en: 'Yes, and in the end they threw a huge party.' },
    { id: 'hi-6', speaker: 'you', es: '¡Qué increíble! Me hubiera encantado estar ahí.', en: 'How incredible! I would have loved to be there.' },
  ],
  chunks: [
    { id: 'hi-c1', es: '¿Sabes qué pasó?', en: 'Do you know what happened?' },
    { id: 'hi-c2', es: 'Cuéntame', en: 'Tell me' },
    { id: 'hi-c3', es: 'Resulta que…', en: 'It turns out that…' },
    { id: 'hi-c4', es: '¿En serio?', en: 'Really? / Seriously?' },
    { id: 'hi-c5', es: 'No lo puedo creer', en: 'I can\'t believe it' },
  ],
  vocab: [
    { id: 'hi-v1', es: 'pasar', en: 'to happen', pos: 'v.' },
    { id: 'hi-v2', es: 'contar', en: 'to tell', pos: 'v.' },
    { id: 'hi-v3', es: 'resultar', en: 'to turn out', pos: 'v.' },
    { id: 'hi-v4', es: 'casarse', en: 'to get married', pos: 'v.' },
    { id: 'hi-v5', es: 'al final', en: 'in the end', pos: 'phrase' },
    { id: 'hi-v6', es: 'increíble', en: 'incredible', pos: 'adj.' },
    { id: 'hi-v7', es: 'la fiesta', en: 'party', pos: 'n.' },
  ],
  grammarNote: 'Story connectors carry a narrative: "resulta que" (it turns out), "entonces" (so/then), "al final" (in the end). Quick reactions keep it alive: "¿en serio?", "¡qué bueno!", "¡no me digas!". "Me hubiera encantado" (I would have loved) is worth learning whole.',
  roleplay: [
    {
      id: 'hi-r1',
      prompt: '¿Sabes qué pasó la semana pasada?',
      promptEn: 'Do you know what happened last week?',
      accept: ['no cuentame que paso', 'no cuentame', 'cuentame que paso'],
      hint: 'Say no and ask them to tell you.',
    },
    {
      id: 'hi-r2',
      prompt: 'Resulta que mi hermano se casó.',
      promptEn: 'It turns out my brother got married.',
      accept: ['en serio no lo puedo creer', 'en serio', 'no lo puedo creer'],
      hint: 'React with surprise.',
    },
    {
      id: 'hi-r3',
      prompt: 'Al final hicieron una fiesta enorme.',
      promptEn: 'In the end they threw a huge party.',
      accept: ['que increible me hubiera encantado estar ahi', 'que increible', 'me hubiera encantado estar ahi'],
      hint: 'Say how incredible, and that you\'d have loved to be there.',
    },
  ],
  shadowing: ['hi-1', 'hi-3', 'hi-5', 'hi-6'],
}
