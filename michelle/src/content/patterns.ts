// Sentence Builder patterns. Inspired by the Michel Thomas approach (construct
// novel sentences from a small set of high-leverage frames) and Pimsleur-style
// anticipation (produce before you confirm). Instead of memorizing fixed lines,
// you internalize a productive "frame" and swap the slot — so you can say things
// to your family that were never in a script.

export interface Filler {
  es: string
  en: string
}

export interface Pattern {
  id: string
  /** Short label for the picker, e.g. "Quiero…" */
  label: string
  /** Frame with a `___` slot, e.g. "Quiero ___" */
  frameEs: string
  frameEn: string
  /** A short note on how/when to use the frame. */
  note: string
  fillers: Filler[]
}

function compose(frame: string, slot: string): string {
  return frame.replace('___', slot)
}

export function composeEs(pattern: Pattern, filler: Filler): string {
  return compose(pattern.frameEs, filler.es)
}

export function composeEn(pattern: Pattern, filler: Filler): string {
  return compose(pattern.frameEn, filler.en)
}

export const patterns: Pattern[] = [
  {
    id: 'quiero',
    label: 'Quiero…',
    frameEs: 'Quiero ___',
    frameEn: 'I want ___',
    note: '"Quiero" + a noun or an infinitive. The single most useful frame for expressing what you want.',
    fillers: [
      { es: 'ver a mi familia', en: 'to see my family' },
      { es: 'un café', en: 'a coffee' },
      { es: 'aprender español', en: 'to learn Spanish' },
      { es: 'descansar un rato', en: 'to rest a while' },
      { es: 'ir a casa', en: 'to go home' },
      { es: 'hablar contigo', en: 'to talk with you' },
    ],
  },
  {
    id: 'megustaria',
    label: 'Me gustaría…',
    frameEs: 'Me gustaría ___',
    frameEn: 'I would like ___',
    note: 'Softer and more polite than "quiero". Great for requests and wishes.',
    fillers: [
      { es: 'visitarlos pronto', en: 'to visit you all soon' },
      { es: 'conocer a tu familia', en: 'to meet your family' },
      { es: 'quedarme más tiempo', en: 'to stay longer' },
      { es: 'probar esto', en: 'to try this' },
      { es: 'aprender a cocinar', en: 'to learn to cook' },
    ],
  },
  {
    id: 'puedespasar',
    label: '¿Me pasas…?',
    frameEs: '¿Me puedes pasar ___?',
    frameEn: 'Can you pass me ___?',
    note: 'Everyday at the family table. Swap in whatever you need.',
    fillers: [
      { es: 'la sal', en: 'the salt' },
      { es: 'el agua', en: 'the water' },
      { es: 'el pan', en: 'the bread' },
      { es: 'ese plato', en: 'that dish' },
      { es: 'una servilleta', en: 'a napkin' },
    ],
  },
  {
    id: 'tengoque',
    label: 'Tengo que…',
    frameEs: 'Tengo que ___',
    frameEn: 'I have to ___',
    note: '"Tener que" + infinitive expresses obligation — what you have to do.',
    fillers: [
      { es: 'llamar a mi mamá', en: 'call my mom' },
      { es: 'irme pronto', en: 'leave soon' },
      { es: 'trabajar mañana', en: 'work tomorrow' },
      { es: 'practicar más', en: 'practice more' },
      { es: 'descansar', en: 'rest' },
    ],
  },
  {
    id: 'comoesta',
    label: '¿Cómo está…?',
    frameEs: '¿Cómo está ___?',
    frameEn: 'How is ___?',
    note: 'Ask warmly about the people who matter. Use "están" for plural (¿Cómo están todos?).',
    fillers: [
      { es: 'tu mamá', en: 'your mom' },
      { es: 'tu abuela', en: 'your grandma' },
      { es: 'la familia', en: 'the family' },
      { es: 'tu hermano', en: 'your brother' },
      { es: 'todo por allá', en: 'everything over there' },
    ],
  },
  {
    id: 'extrano',
    label: 'Extraño…',
    frameEs: 'Extraño ___',
    frameEn: 'I miss ___',
    note: 'Say what (or who) you miss. For people, add "a": "extraño a mi abuela".',
    fillers: [
      { es: 'a mi familia', en: 'my family' },
      { es: 'a mi abuela', en: 'my grandma' },
      { es: 'la comida de casa', en: 'home cooking' },
      { es: 'hablar contigo', en: 'talking with you' },
      { es: 'el Ecuador', en: 'Ecuador' },
    ],
  },
  {
    id: 'podemos',
    label: '¿Podemos…?',
    frameEs: '¿Podemos ___?',
    frameEn: 'Can we ___?',
    note: 'Suggest doing something together — "podemos" + infinitive.',
    fillers: [
      { es: 'hablar más tarde', en: 'talk later' },
      { es: 'hacer una videollamada', en: 'do a video call' },
      { es: 'vernos pronto', en: 'see each other soon' },
      { es: 'comer algo juntos', en: 'eat something together' },
      { es: 'ir todos', en: 'all go' },
    ],
  },
  {
    id: 'estoy',
    label: 'Estoy…',
    frameEs: 'Estoy ___',
    frameEn: 'I am ___ (right now)',
    note: '"Estar" for moods and temporary states — how you feel in the moment.',
    fillers: [
      { es: 'feliz de verte', en: 'happy to see you' },
      { es: 'un poco cansado', en: 'a little tired' },
      { es: 'aprendiendo español', en: 'learning Spanish' },
      { es: 'muy contento aquí', en: 'very glad here' },
      { es: 'nervioso, la verdad', en: 'nervous, honestly' },
    ],
  },
]
