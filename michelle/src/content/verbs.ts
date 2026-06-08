// The verbs that unlock most everyday speech, now across the tenses that carry
// you through high-school Spanish: present, preterite, imperfect, future and
// conditional. Drilled hear-and-repeat, plus an active-recall quiz.

export type TenseId = 'present' | 'preterite' | 'imperfect' | 'future' | 'conditional'

export interface TenseMeta {
  id: TenseId
  name: string
  note: string
}

export const tenses: TenseMeta[] = [
  { id: 'present', name: 'Present', note: 'what happens now or habitually' },
  { id: 'preterite', name: 'Preterite', note: 'a completed past action' },
  { id: 'imperfect', name: 'Imperfect', note: 'used to / was —ing (background past)' },
  { id: 'future', name: 'Future', note: 'will (do something)' },
  { id: 'conditional', name: 'Conditional', note: 'would (do something)' },
]

export interface VerbForm {
  label: string
  es: string
}

export interface Verb {
  id: string
  infinitive: string
  en: string
  note?: string
  example: { es: string, en: string }
  forms: Record<TenseId, VerbForm[]>
}

const P = ['yo', 'tú', 'él / ella / usted', 'nosotros', 'ellos / ustedes']
const PG = ['a mí', 'a ti', 'a él / ella / usted', 'a nosotros', 'a ellos / ustedes']

function f(labels: string[], vals: string[]): VerbForm[] {
  return vals.map((es, i) => ({ label: labels[i], es }))
}

// Future and conditional are built from a stem with regular endings.
function fut(stem: string): string[] {
  return [`${stem}é`, `${stem}ás`, `${stem}á`, `${stem}emos`, `${stem}án`]
}
function cond(stem: string): string[] {
  return [`${stem}ía`, `${stem}ías`, `${stem}ía`, `${stem}íamos`, `${stem}ían`]
}

export const verbs: Verb[] = [
  {
    id: 'ser',
    infinitive: 'ser',
    en: 'to be (identity, origin, traits)',
    note: 'Use for who you are and where you\'re from. Note the imperfect (era) and preterite (fui) are both irregular.',
    example: { es: 'Soy de Estados Unidos.', en: 'I\'m from the United States.' },
    forms: {
      present: f(P, ['soy', 'eres', 'es', 'somos', 'son']),
      preterite: f(P, ['fui', 'fuiste', 'fue', 'fuimos', 'fueron']),
      imperfect: f(P, ['era', 'eras', 'era', 'éramos', 'eran']),
      future: f(P, fut('ser')),
      conditional: f(P, cond('ser')),
    },
  },
  {
    id: 'estar',
    infinitive: 'estar',
    en: 'to be (state, mood, location)',
    note: 'Use for how you feel and where things are.',
    example: { es: '¿Cómo estás?', en: 'How are you?' },
    forms: {
      present: f(P, ['estoy', 'estás', 'está', 'estamos', 'están']),
      preterite: f(P, ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvieron']),
      imperfect: f(P, ['estaba', 'estabas', 'estaba', 'estábamos', 'estaban']),
      future: f(P, fut('estar')),
      conditional: f(P, cond('estar')),
    },
  },
  {
    id: 'tener',
    infinitive: 'tener',
    en: 'to have',
    note: 'Also age and relationships: "tengo treinta años". Future/conditional use the irregular stem "tendr-".',
    example: { es: 'Tengo dos hermanos.', en: 'I have two siblings.' },
    forms: {
      present: f(P, ['tengo', 'tienes', 'tiene', 'tenemos', 'tienen']),
      preterite: f(P, ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvieron']),
      imperfect: f(P, ['tenía', 'tenías', 'tenía', 'teníamos', 'tenían']),
      future: f(P, fut('tendr')),
      conditional: f(P, cond('tendr')),
    },
  },
  {
    id: 'ir',
    infinitive: 'ir',
    en: 'to go',
    note: '"ir a" + infinitive is the easy future. In the preterite, ir and ser share the same forms (fui...).',
    example: { es: 'Voy a visitar a mi familia.', en: 'I\'m going to visit my family.' },
    forms: {
      present: f(P, ['voy', 'vas', 'va', 'vamos', 'van']),
      preterite: f(P, ['fui', 'fuiste', 'fue', 'fuimos', 'fueron']),
      imperfect: f(P, ['iba', 'ibas', 'iba', 'íbamos', 'iban']),
      future: f(P, fut('ir')),
      conditional: f(P, cond('ir')),
    },
  },
  {
    id: 'hacer',
    infinitive: 'hacer',
    en: 'to do / to make',
    note: 'Future/conditional stem is "har-". Preterite "hizo" swaps c→z in the él form.',
    example: { es: '¿Qué hiciste ayer?', en: 'What did you do yesterday?' },
    forms: {
      present: f(P, ['hago', 'haces', 'hace', 'hacemos', 'hacen']),
      preterite: f(P, ['hice', 'hiciste', 'hizo', 'hicimos', 'hicieron']),
      imperfect: f(P, ['hacía', 'hacías', 'hacía', 'hacíamos', 'hacían']),
      future: f(P, fut('har')),
      conditional: f(P, cond('har')),
    },
  },
  {
    id: 'querer',
    infinitive: 'querer',
    en: 'to want / to love',
    note: 'Present stem-changes e→ie. Future/conditional stem is "querr-".',
    example: { es: 'Quiero un café, por favor.', en: 'I want a coffee, please.' },
    forms: {
      present: f(P, ['quiero', 'quieres', 'quiere', 'queremos', 'quieren']),
      preterite: f(P, ['quise', 'quisiste', 'quiso', 'quisimos', 'quisieron']),
      imperfect: f(P, ['quería', 'querías', 'quería', 'queríamos', 'querían']),
      future: f(P, fut('querr')),
      conditional: f(P, cond('querr')),
    },
  },
  {
    id: 'poder',
    infinitive: 'poder',
    en: 'to be able / can',
    note: 'Present stem-changes o→ue. Future/conditional stem is "podr-".',
    example: { es: '¿Me puede ayudar?', en: 'Can you help me?' },
    forms: {
      present: f(P, ['puedo', 'puedes', 'puede', 'podemos', 'pueden']),
      preterite: f(P, ['pude', 'pudiste', 'pudo', 'pudimos', 'pudieron']),
      imperfect: f(P, ['podía', 'podías', 'podía', 'podíamos', 'podían']),
      future: f(P, fut('podr')),
      conditional: f(P, cond('podr')),
    },
  },
  {
    id: 'gustar',
    infinitive: 'gustar',
    en: 'to like (works backwards)',
    note: 'The thing liked is the subject, so you mostly use these "le/me…" forms. Add -n for plural things: "me gustan los tacos".',
    example: { es: 'Me gusta la comida de aquí.', en: 'I like the food here.' },
    forms: {
      present: f(PG, ['me gusta', 'te gusta', 'le gusta', 'nos gusta', 'les gusta']),
      preterite: f(PG, ['me gustó', 'te gustó', 'le gustó', 'nos gustó', 'les gustó']),
      imperfect: f(PG, ['me gustaba', 'te gustaba', 'le gustaba', 'nos gustaba', 'les gustaba']),
      future: f(PG, ['me gustará', 'te gustará', 'le gustará', 'nos gustará', 'les gustará']),
      conditional: f(PG, ['me gustaría', 'te gustaría', 'le gustaría', 'nos gustaría', 'les gustaría']),
    },
  },
]
