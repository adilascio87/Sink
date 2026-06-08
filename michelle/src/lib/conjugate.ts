// A compact Spanish conjugation engine. It conjugates regular -ar/-er/-ir verbs
// across the five core tenses and overrides the high-frequency irregulars, so
// the Conjugation Trainer can drill many verbs without hand-writing every form.
// Persons: 0 yo · 1 tú · 2 él/ella/usted · 3 nosotros · 4 ellos/ustedes.

export type Tense = 'present' | 'preterite' | 'imperfect' | 'future' | 'conditional'
export type Person = 0 | 1 | 2 | 3 | 4

export const PRONOUNS = ['yo', 'tú', 'él / ella / usted', 'nosotros', 'ellos / ustedes']

const PRESENT = {
  ar: ['o', 'as', 'a', 'amos', 'an'],
  er: ['o', 'es', 'e', 'emos', 'en'],
  ir: ['o', 'es', 'e', 'imos', 'en'],
}
const PRETERITE = {
  ar: ['é', 'aste', 'ó', 'amos', 'aron'],
  er: ['í', 'iste', 'ió', 'imos', 'ieron'],
  ir: ['í', 'iste', 'ió', 'imos', 'ieron'],
}
const IMPERFECT = {
  ar: ['aba', 'abas', 'aba', 'ábamos', 'aban'],
  er: ['ía', 'ías', 'ía', 'íamos', 'ían'],
  ir: ['ía', 'ías', 'ía', 'íamos', 'ían'],
}
const FUTURE = ['é', 'ás', 'á', 'emos', 'án']
const CONDITIONAL = ['ía', 'ías', 'ía', 'íamos', 'ían']

interface Irregular {
  present?: string[]
  preterite?: string[]
  imperfect?: string[]
  /** Irregular stem for future + conditional (else the full infinitive). */
  futureStem?: string
}

const IRREGULARS: Record<string, Irregular> = {
  ser: {
    present: ['soy', 'eres', 'es', 'somos', 'son'],
    preterite: ['fui', 'fuiste', 'fue', 'fuimos', 'fueron'],
    imperfect: ['era', 'eras', 'era', 'éramos', 'eran'],
  },
  estar: {
    present: ['estoy', 'estás', 'está', 'estamos', 'están'],
    preterite: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvieron'],
  },
  ir: {
    present: ['voy', 'vas', 'va', 'vamos', 'van'],
    preterite: ['fui', 'fuiste', 'fue', 'fuimos', 'fueron'],
    imperfect: ['iba', 'ibas', 'iba', 'íbamos', 'iban'],
  },
  tener: {
    present: ['tengo', 'tienes', 'tiene', 'tenemos', 'tienen'],
    preterite: ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvieron'],
    futureStem: 'tendr',
  },
  hacer: {
    present: ['hago', 'haces', 'hace', 'hacemos', 'hacen'],
    preterite: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicieron'],
    futureStem: 'har',
  },
  poder: {
    present: ['puedo', 'puedes', 'puede', 'podemos', 'pueden'],
    preterite: ['pude', 'pudiste', 'pudo', 'pudimos', 'pudieron'],
    futureStem: 'podr',
  },
  querer: {
    present: ['quiero', 'quieres', 'quiere', 'queremos', 'quieren'],
    preterite: ['quise', 'quisiste', 'quiso', 'quisimos', 'quisieron'],
    futureStem: 'querr',
  },
  venir: {
    present: ['vengo', 'vienes', 'viene', 'venimos', 'vienen'],
    preterite: ['vine', 'viniste', 'vino', 'vinimos', 'vinieron'],
    futureStem: 'vendr',
  },
  decir: {
    present: ['digo', 'dices', 'dice', 'decimos', 'dicen'],
    preterite: ['dije', 'dijiste', 'dijo', 'dijimos', 'dijeron'],
    futureStem: 'dir',
  },
  ver: {
    present: ['veo', 'ves', 've', 'vemos', 'ven'],
    imperfect: ['veía', 'veías', 'veía', 'veíamos', 'veían'],
  },
}

export function conjugate(infinitive: string, tense: Tense, person: Person): string {
  const irr = IRREGULARS[infinitive]

  if (tense === 'future' || tense === 'conditional') {
    const stem = irr?.futureStem ?? infinitive
    return stem + (tense === 'future' ? FUTURE : CONDITIONAL)[person]
  }

  const override = irr?.[tense]
  if (override)
    return override[person]

  const ending = infinitive.slice(-2)
  const root = infinitive.slice(0, -2)
  const key = (ending === 'ar' ? 'ar' : ending === 'er' ? 'er' : 'ir') as 'ar' | 'er' | 'ir'
  const table = tense === 'present' ? PRESENT : tense === 'preterite' ? PRETERITE : IMPERFECT
  return root + table[key][person]
}
