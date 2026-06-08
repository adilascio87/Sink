import type { Scenario } from '@/content/types'

export const sobremesa: Scenario = {
  id: 'sobremesa',
  tier: 3,
  cefr: 'B1',
  title: 'La sobremesa',
  goal: 'Compliment the cook and decline seconds politely after a family meal.',
  culture: 'The "sobremesa" — staying at the table talking long after the food is gone — is sacred family time in Ecuador. Praising the cook ("estuvo riquísimo") and thanking them warmly matters a lot.',
  dialogue: [
    { id: 'so-1', speaker: 'them', es: '¿Quieres más? Hay bastante.', en: 'Do you want more? There\'s plenty.' },
    { id: 'so-2', speaker: 'you', es: 'No, gracias, quedé lleno. Estuvo riquísimo.', en: 'No thanks, I\'m full. It was delicious.' },
    { id: 'so-3', speaker: 'them', es: 'Me alegra que te haya gustado.', en: 'I\'m glad you liked it.' },
    { id: 'so-4', speaker: 'you', es: '¿Usted cocinó todo esto?', en: 'Did you cook all of this?' },
    { id: 'so-5', speaker: 'them', es: 'Sí, con mucho cariño.', en: 'Yes, with a lot of love.' },
    { id: 'so-6', speaker: 'you', es: 'Se nota. Muchas gracias por todo.', en: 'You can tell. Thank you so much for everything.' },
  ],
  chunks: [
    { id: 'so-c1', es: '¿Quieres más?', en: 'Do you want more?' },
    { id: 'so-c2', es: 'quedé lleno', en: 'I\'m full' },
    { id: 'so-c3', es: 'Estuvo riquísimo', en: 'It was delicious' },
    { id: 'so-c4', es: 'con mucho cariño', en: 'with a lot of love' },
    { id: 'so-c5', es: 'Gracias por todo', en: 'Thanks for everything' },
  ],
  vocab: [
    { id: 'so-v1', es: 'lleno', en: 'full', pos: 'adj.' },
    { id: 'so-v2', es: 'cocinar', en: 'to cook', pos: 'v.' },
    { id: 'so-v3', es: 'el cariño', en: 'affection / love', pos: 'n.' },
    { id: 'so-v4', es: 'riquísimo', en: 'super tasty', pos: 'adj.' },
    { id: 'so-v5', es: 'bastante', en: 'plenty / quite a lot', pos: 'adv.' },
    { id: 'so-v6', es: 'notar', en: 'to notice / tell', pos: 'v.' },
    { id: 'so-v7', es: 'la comida', en: 'food / meal', pos: 'n.' },
  ],
  grammarNote: 'Add "-ísimo/-ísima" to an adjective for "very / super": rico → riquísimo, bueno → buenísimo, lindo → lindísimo. "Quedé lleno" uses the preterite of "quedar" for a resulting state ("I ended up full"). "Me alegra que…" is a warm fixed phrase — learn it whole.',
  roleplay: [
    {
      id: 'so-r1',
      prompt: '¿Quieres más? Hay bastante.',
      promptEn: 'Do you want more? There\'s plenty.',
      accept: ['no gracias quede lleno estuvo riquisimo', 'no gracias quede lleno', 'no gracias estuvo riquisimo'],
      hint: 'Decline, say you\'re full, and praise the food.',
    },
    {
      id: 'so-r2',
      prompt: 'Me alegra que te haya gustado.',
      promptEn: 'I\'m glad you liked it.',
      accept: ['usted cocino todo esto', 'cocino todo esto usted', 'usted preparo todo esto'],
      hint: 'Ask if they cooked all of it.',
    },
    {
      id: 'so-r3',
      prompt: 'Sí, con mucho cariño.',
      promptEn: 'Yes, with a lot of love.',
      accept: ['se nota muchas gracias por todo', 'muchas gracias por todo', 'se nota gracias por todo'],
      hint: 'Say you can tell, and thank them for everything.',
    },
  ],
  shadowing: ['so-2', 'so-4', 'so-6'],
}
