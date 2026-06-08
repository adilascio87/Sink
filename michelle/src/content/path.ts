// A guided first week. Most language apps fail because it's never clear what to
// do next; this gives a short, opinionated path from "hello" to holding a real
// family conversation. It references existing scenarios and tools — nothing here
// is mandatory, it's just the recommended order.

export interface PlanDay {
  day: number
  title: string
  focus: string
  scenarios: string[]
  tools?: { label: string, to: string }[]
}

export const plan: PlanDay[] = [
  {
    day: 1,
    title: 'Say hello like you mean it',
    focus: 'Greet, introduce yourself, and start fixing your accent.',
    scenarios: ['greetings'],
    tools: [{ label: 'Sounds: vowels & more', to: '/pronunciation' }],
  },
  {
    day: 2,
    title: 'Survive the day',
    focus: 'Order food, handle numbers and prices.',
    scenarios: ['numeros', 'almuerzo'],
  },
  {
    day: 3,
    title: 'Talk about your family',
    focus: 'Siblings, parents, and saying you miss them.',
    scenarios: ['familia'],
  },
  {
    day: 4,
    title: 'Meet and call relatives',
    focus: 'Be introduced warmly, and have a phone call with grandma.',
    scenarios: ['presentar', 'llamada'],
  },
  {
    day: 5,
    title: 'Speak from the heart',
    focus: 'Express affection, say goodbye the way family does.',
    scenarios: ['afecto'],
  },
  {
    day: 6,
    title: 'Make it your own',
    focus: 'Build your own sentences and lock in the key verbs.',
    scenarios: [],
    tools: [
      { label: 'Sentence builder', to: '/builder' },
      { label: 'Key verbs', to: '/verbs' },
    ],
  },
  {
    day: 7,
    title: 'Hold a real conversation',
    focus: 'Catch up on news, react, and share your opinion.',
    scenarios: ['historia', 'opinion'],
  },
]
