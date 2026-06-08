// Pronunciation focus for English speakers. These are the sounds that most
// affect whether your family actually understands you — the highest-leverage
// fixes, not a full phonetics course. Each lesson is hear-and-repeat.

export interface SoundExample {
  es: string
  en: string
}

export interface MinimalPair {
  a: string
  b: string
  note: string
}

export interface SoundLesson {
  id: string
  symbol: string
  title: string
  tip: string
  examples: SoundExample[]
  pairs?: MinimalPair[]
}

export const sounds: SoundLesson[] = [
  {
    id: 'vowels',
    symbol: 'a e i o u',
    title: 'The five pure vowels',
    tip: 'Spanish vowels are short, crisp, and always the same — they never glide like English. "o" is not "oh-w" and "e" is not "ey". This one fix makes the biggest difference to your accent.',
    examples: [
      { es: 'casa', en: 'house (a)' },
      { es: 'café', en: 'coffee (e)' },
      { es: 'sí', en: 'yes (i)' },
      { es: 'no', en: 'no (o)' },
      { es: 'tú', en: 'you (u)' },
    ],
    pairs: [
      { a: 'peso', b: 'piso', note: 'e vs i — weight vs floor' },
    ],
  },
  {
    id: 'rr',
    symbol: 'r / rr',
    title: 'The tap and the trill',
    tip: 'A single "r" between vowels is one quick tap — the same flick as the "tt" in American "butter". The "rr" (and any word-initial r) is a rolled trill: relax your tongue and let it flutter against the ridge behind your teeth.',
    examples: [
      { es: 'pero', en: 'but (single tap)' },
      { es: 'perro', en: 'dog (trill)' },
      { es: 'arroz', en: 'rice' },
      { es: 'rojo', en: 'red' },
    ],
    pairs: [
      { a: 'pero', b: 'perro', note: 'but vs dog' },
      { a: 'caro', b: 'carro', note: 'expensive vs car' },
    ],
  },
  {
    id: 'enye',
    symbol: 'ñ',
    title: 'The ñ sound',
    tip: 'Like the "ny" in "canyon" — one smooth sound, not two.',
    examples: [
      { es: 'niño', en: 'child' },
      { es: 'año', en: 'year' },
      { es: 'señora', en: 'ma\'am' },
      { es: 'mañana', en: 'tomorrow / morning' },
    ],
    pairs: [
      { a: 'año', b: 'ano', note: '"año" = year; without the ñ it means a body part — the ñ really matters!' },
    ],
  },
  {
    id: 'jota',
    symbol: 'j / g',
    title: 'The throaty j',
    tip: 'The "j" is a strong h from the back of the throat — heavier than English "h". The "g" before e or i sounds the same (gente, gimnasio). Before a/o/u the g is hard, as in "go" (gato).',
    examples: [
      { es: 'jamón', en: 'ham' },
      { es: 'trabajo', en: 'work' },
      { es: 'gente', en: 'people' },
      { es: 'jugo', en: 'juice' },
    ],
  },
  {
    id: 'bv',
    symbol: 'b = v',
    title: 'b and v are the same',
    tip: 'In Spanish, "b" and "v" are pronounced identically — a soft b. "vaca" and "baca" sound the same. Don\'t bite your lip for the v.',
    examples: [
      { es: 'vaca', en: 'cow' },
      { es: 'bueno', en: 'good' },
      { es: 'vivir', en: 'to live' },
      { es: 'trabajar', en: 'to work' },
    ],
  },
  {
    id: 'softd',
    symbol: 'd',
    title: 'The soft d',
    tip: 'Between vowels (and at the end of a word) the "d" is soft, close to the "th" in "this". "nada" sounds almost like "na-tha".',
    examples: [
      { es: 'nada', en: 'nothing' },
      { es: 'todo', en: 'everything' },
      { es: 'cada', en: 'each' },
      { es: 'adiós', en: 'goodbye' },
    ],
  },
  {
    id: 'lly',
    symbol: 'll / y',
    title: 'll and y',
    tip: 'In Ecuador and most of Latin America, "ll" and "y" both sound like the English "y" in "yes".',
    examples: [
      { es: 'llamar', en: 'to call' },
      { es: 'pollo', en: 'chicken' },
      { es: 'playa', en: 'beach' },
      { es: 'yo', en: 'I' },
    ],
  },
  {
    id: 'silent-h',
    symbol: 'h',
    title: 'The silent h',
    tip: 'The "h" is always silent. "hola" is said "ola"; "hora" is "ora".',
    examples: [
      { es: 'hola', en: 'hello' },
      { es: 'hora', en: 'hour' },
      { es: 'hambre', en: 'hunger' },
      { es: 'ahora', en: 'now' },
    ],
  },
  {
    id: 'seseo',
    symbol: 'c / z = s',
    title: 'c and z sound like s',
    tip: 'In Ecuador, "c" before e/i and "z" everywhere sound like English "s" — there\'s no "th" lisp like in Spain. "gracias" ends in an s sound.',
    examples: [
      { es: 'gracias', en: 'thank you' },
      { es: 'cinco', en: 'five' },
      { es: 'zapato', en: 'shoe' },
      { es: 'plaza', en: 'square / plaza' },
    ],
  },
]
