import type { Scenario } from '@/content/types'

export const ayuda: Scenario = {
  id: 'ayuda',
  tier: 3,
  cefr: 'B1',
  title: 'Pedir ayuda',
  goal: 'Ask for help when you\'re lost or something goes wrong, and accept it graciously.',
  culture: 'Ecuadorians are quick to help a stranger. "Tranquilo/a" ("don\'t worry") is everywhere, and "para eso estamos" ("that\'s what we\'re here for") is a warm reply to thanks.',
  dialogue: [
    { id: 'ay-1', speaker: 'you', es: 'Disculpe, ¿me puede ayudar? Creo que me perdí.', en: 'Excuse me, can you help me? I think I\'m lost.' },
    { id: 'ay-2', speaker: 'them', es: 'Claro, ¿a dónde quiere ir?', en: 'Of course, where do you want to go?' },
    { id: 'ay-3', speaker: 'you', es: 'Busco la estación de bus. Y se me perdió el celular.', en: 'I\'m looking for the bus station. And I lost my phone.' },
    { id: 'ay-4', speaker: 'them', es: 'Tranquilo. La estación está cerca. ¿Quiere que llame a alguien?', en: 'Don\'t worry. The station is close. Do you want me to call someone?' },
    { id: 'ay-5', speaker: 'you', es: 'Sí, por favor. Muchas gracias por la ayuda.', en: 'Yes, please. Thank you so much for the help.' },
    { id: 'ay-6', speaker: 'them', es: 'De nada, para eso estamos.', en: 'You\'re welcome, that\'s what we\'re here for.' },
  ],
  chunks: [
    { id: 'ay-c1', es: '¿Me puede ayudar?', en: 'Can you help me?' },
    { id: 'ay-c2', es: 'Creo que me perdí', en: 'I think I\'m lost' },
    { id: 'ay-c3', es: 'se me perdió…', en: 'I lost… / … got lost on me' },
    { id: 'ay-c4', es: 'Gracias por la ayuda', en: 'Thanks for the help' },
    { id: 'ay-c5', es: 'para eso estamos', en: 'that\'s what we\'re here for' },
  ],
  vocab: [
    { id: 'ay-v1', es: 'ayudar', en: 'to help', pos: 'v.' },
    { id: 'ay-v2', es: 'perderse', en: 'to get lost', pos: 'v.' },
    { id: 'ay-v3', es: 'el celular', en: 'cell phone', pos: 'n.' },
    { id: 'ay-v4', es: 'la estación', en: 'station', pos: 'n.' },
    { id: 'ay-v5', es: 'tranquilo', en: 'calm / don\'t worry', pos: 'adj.' },
    { id: 'ay-v6', es: 'necesitar', en: 'to need', pos: 'v.' },
    { id: 'ay-v7', es: 'el hospital', en: 'hospital', pos: 'n.' },
  ],
  grammarNote: '"Se me perdió el celular" is the "accidental se": it shifts blame off you — literally "the phone got lost on me". Same pattern: "se me olvidó" (I forgot), "se me cayó" (I dropped it). Handy for emergencies: "necesito ayuda", "¿dónde hay un hospital?".',
  roleplay: [
    {
      id: 'ay-r1',
      prompt: '¿Le pasa algo?',
      promptEn: 'Is something wrong?',
      accept: ['me puede ayudar creo que me perdi', 'me puede ayudar', 'creo que me perdi me puede ayudar'],
      hint: 'Ask for help; say you think you\'re lost.',
    },
    {
      id: 'ay-r2',
      prompt: '¿A dónde quiere ir?',
      promptEn: 'Where do you want to go?',
      accept: ['busco la estacion de bus', 'busco la estacion', 'a la estacion de bus'],
      hint: 'Say you\'re looking for the bus station.',
    },
    {
      id: 'ay-r3',
      prompt: 'Tranquilo, la estación está cerca.',
      promptEn: 'Don\'t worry, the station is close.',
      accept: ['muchas gracias por la ayuda', 'gracias por la ayuda', 'muchas gracias por su ayuda'],
      hint: 'Thank them for the help.',
    },
  ],
  shadowing: ['ay-1', 'ay-3', 'ay-5'],
}
