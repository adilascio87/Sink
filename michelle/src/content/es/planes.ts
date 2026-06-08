import type { Scenario } from '@/content/types'

export const planes: Scenario = {
  id: 'planes',
  tier: 2,
  cefr: 'A2',
  title: 'Hacer planes',
  goal: 'Invite someone out, agree on a time, and confirm the plan.',
  culture: 'Ecuadorians often say "el finde" for the weekend and "dale" as a casual "okay/sounds good". "Nos vemos" ("see you") is the standard sign-off. Time is given on the hour with "a las…".',
  dialogue: [
    { id: 'p-1', speaker: 'them', es: '¿Qué haces el finde?', en: 'What are you doing this weekend?' },
    { id: 'p-2', speaker: 'you', es: 'Nada todavía. ¿Por qué?', en: 'Nothing yet. Why?' },
    { id: 'p-3', speaker: 'them', es: '¿Quieres ir a tomar un café?', en: 'Do you want to go get a coffee?' },
    { id: 'p-4', speaker: 'you', es: '¡Dale! ¿A qué hora?', en: 'Sounds good! What time?' },
    { id: 'p-5', speaker: 'them', es: 'El sábado a las cuatro, ¿te parece?', en: 'Saturday at four, does that work for you?' },
    { id: 'p-6', speaker: 'you', es: 'Perfecto. Nos vemos el sábado.', en: 'Perfect. See you Saturday.' },
  ],
  chunks: [
    { id: 'p-c1', es: '¿Qué haces el finde?', en: 'What are you doing this weekend?' },
    { id: 'p-c2', es: '¿Quieres ir a…?', en: 'Do you want to go…?' },
    { id: 'p-c3', es: '¿A qué hora?', en: 'What time?' },
    { id: 'p-c4', es: '¿Te parece?', en: 'Does that work for you? / Sound good?' },
    { id: 'p-c5', es: 'Nos vemos', en: 'See you' },
  ],
  vocab: [
    { id: 'p-v1', es: 'el finde', en: 'the weekend (casual)', pos: 'n.' },
    { id: 'p-v2', es: 'dale', en: 'okay / go for it', pos: 'interj.' },
    { id: 'p-v3', es: 'el sábado', en: 'Saturday', pos: 'n.' },
    { id: 'p-v4', es: 'la hora', en: 'time / hour', pos: 'n.' },
    { id: 'p-v5', es: 'querer', en: 'to want', pos: 'v.' },
    { id: 'p-v6', es: 'perfecto', en: 'perfect', pos: 'adj.' },
    { id: 'p-v7', es: 'todavía', en: 'yet / still', pos: 'adv.' },
  ],
  grammarNote: 'Telling time uses "a las" + number for the hour: "a las cuatro" (at four), "a las ocho y media" (at 8:30). The only exception is one o\'clock: "a la una". "¿Quieres…?" + an infinitive is the everyday way to invite: "¿Quieres comer?", "¿Quieres salir?"',
  roleplay: [
    {
      id: 'p-r1',
      prompt: '¿Qué haces el finde?',
      promptEn: 'What are you doing this weekend?',
      accept: ['nada todavia por que', 'nada todavia', 'nada por que'],
      hint: 'Say "nothing yet" and ask why.',
    },
    {
      id: 'p-r2',
      prompt: '¿Quieres ir a tomar un café?',
      promptEn: 'Do you want to go get a coffee?',
      accept: ['dale a que hora', 'si dale a que hora', 'claro a que hora'],
      hint: 'Accept enthusiastically and ask the time.',
    },
    {
      id: 'p-r3',
      prompt: 'El sábado a las cuatro, ¿te parece?',
      promptEn: 'Saturday at four, does that work?',
      accept: ['perfecto nos vemos el sabado', 'perfecto nos vemos', 'dale nos vemos el sabado'],
      hint: 'Confirm and say "see you Saturday".',
    },
  ],
  shadowing: ['p-1', 'p-3', 'p-4', 'p-6'],
}
