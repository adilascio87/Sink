// The handful of verbs that unlock most everyday speech. Present tense only —
// these are the ones worth knowing cold. Drilled hear-and-repeat.

export interface VerbForm {
  label: string
  es: string
}

export interface Verb {
  id: string
  infinitive: string
  en: string
  note?: string
  forms: VerbForm[]
  example: { es: string, en: string }
}

const PRONOUNS = ['yo', 'tú', 'él / ella / usted', 'nosotros', 'ellos / ustedes']

function conj(forms: string[]): VerbForm[] {
  return forms.map((es, i) => ({ label: PRONOUNS[i], es }))
}

export const verbs: Verb[] = [
  {
    id: 'ser',
    infinitive: 'ser',
    en: 'to be (permanent: who/what you are)',
    note: 'Use "ser" for identity, origin, and traits: who you are, where you\'re from.',
    forms: conj(['soy', 'eres', 'es', 'somos', 'son']),
    example: { es: 'Soy de Estados Unidos.', en: 'I\'m from the United States.' },
  },
  {
    id: 'estar',
    infinitive: 'estar',
    en: 'to be (state/location: how/where you are)',
    note: 'Use "estar" for moods, conditions, and location — how you feel and where things are.',
    forms: conj(['estoy', 'estás', 'está', 'estamos', 'están']),
    example: { es: '¿Cómo estás?', en: 'How are you?' },
  },
  {
    id: 'tener',
    infinitive: 'tener',
    en: 'to have',
    note: 'Also used for age and relationships: "tengo treinta años", "tengo dos hermanos".',
    forms: conj(['tengo', 'tienes', 'tiene', 'tenemos', 'tienen']),
    example: { es: 'Tengo dos hermanos.', en: 'I have two siblings.' },
  },
  {
    id: 'ir',
    infinitive: 'ir',
    en: 'to go',
    note: '"ir a" + infinitive is the easy future: "voy a llamar" (I\'m going to call).',
    forms: conj(['voy', 'vas', 'va', 'vamos', 'van']),
    example: { es: 'Voy a visitar a mi familia.', en: 'I\'m going to visit my family.' },
  },
  {
    id: 'hacer',
    infinitive: 'hacer',
    en: 'to do / to make',
    forms: conj(['hago', 'haces', 'hace', 'hacemos', 'hacen']),
    example: { es: '¿Qué haces?', en: 'What are you doing?' },
  },
  {
    id: 'querer',
    infinitive: 'querer',
    en: 'to want / to love',
    note: 'Stem changes e→ie. "querer" + infinitive = to want to do; with people it means "to love".',
    forms: conj(['quiero', 'quieres', 'quiere', 'queremos', 'quieren']),
    example: { es: 'Te quiero mucho.', en: 'I love you a lot.' },
  },
  {
    id: 'poder',
    infinitive: 'poder',
    en: 'to be able / can',
    note: 'Stem changes o→ue. "¿Me puede…?" is the polite way to ask for help.',
    forms: conj(['puedo', 'puedes', 'puede', 'podemos', 'pueden']),
    example: { es: '¿Me puede ayudar?', en: 'Can you help me?' },
  },
  {
    id: 'gustar',
    infinitive: 'gustar',
    en: 'to like (works backwards)',
    note: 'The thing liked is the subject: "me gusta el café" (coffee pleases me). Use "gustan" for plural things: "me gustan los tacos".',
    forms: [
      { label: 'a mí', es: 'me gusta' },
      { label: 'a ti', es: 'te gusta' },
      { label: 'a él / ella / usted', es: 'le gusta' },
      { label: 'a nosotros', es: 'nos gusta' },
      { label: 'a ellos / ustedes', es: 'les gusta' },
    ],
    example: { es: 'Me gusta la comida de aquí.', en: 'I like the food here.' },
  },
]
