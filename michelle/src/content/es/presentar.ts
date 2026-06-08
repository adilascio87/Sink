import type { Scenario } from '@/content/types'

export const presentar: Scenario = {
  id: 'presentar',
  tier: 2,
  cefr: 'A2',
  title: 'Conocer a la familia',
  goal: 'Be introduced to a relative and respond warmly when welcomed.',
  culture: 'Meeting family in Ecuador is warm and immediate — you\'ll likely be offered food within a minute. "Mijo / mija" (from "mi hijo/hija") is an affectionate way elders address younger people, even if you\'re not their child.',
  dialogue: [
    { id: 'pr-1', speaker: 'them', es: 'Te presento a mi mamá.', en: 'Let me introduce you to my mom.' },
    { id: 'pr-2', speaker: 'you', es: 'Mucho gusto, señora. Encantado de conocerla.', en: 'Nice to meet you, ma\'am. Pleased to meet you.' },
    { id: 'pr-3', speaker: 'them', es: 'El gusto es mío, mijo. Bienvenido.', en: 'The pleasure is mine, dear. Welcome.' },
    { id: 'pr-4', speaker: 'you', es: 'Gracias por recibirme.', en: 'Thank you for having me.' },
    { id: 'pr-5', speaker: 'them', es: 'Pasa, pasa. ¿Tienes hambre?', en: 'Come in, come in. Are you hungry?' },
    { id: 'pr-6', speaker: 'you', es: 'Un poquito, la verdad.', en: 'A little, honestly.' },
  ],
  chunks: [
    { id: 'pr-c1', es: 'Te presento a…', en: 'Let me introduce you to…' },
    { id: 'pr-c2', es: 'Encantado de conocerla', en: 'Pleased to meet you (formal)' },
    { id: 'pr-c3', es: 'Gracias por recibirme', en: 'Thank you for having me' },
    { id: 'pr-c4', es: 'Pasa, pasa', en: 'Come in, come in' },
    { id: 'pr-c5', es: 'un poquito, la verdad', en: 'a little, honestly' },
  ],
  vocab: [
    { id: 'pr-v1', es: 'presentar', en: 'to introduce', pos: 'v.' },
    { id: 'pr-v2', es: 'la mamá', en: 'mom', pos: 'n.' },
    { id: 'pr-v3', es: 'mijo / mija', en: 'dear (affectionate)', pos: 'n.' },
    { id: 'pr-v4', es: 'recibir', en: 'to receive / host', pos: 'v.' },
    { id: 'pr-v5', es: 'el hambre', en: 'hunger', pos: 'n.' },
    { id: 'pr-v6', es: 'encantado', en: 'delighted', pos: 'adj.' },
    { id: 'pr-v7', es: 'bienvenido', en: 'welcome', pos: 'adj.' },
  ],
  grammarNote: 'Say "encantado" if you\'re male, "encantada" if female — adjectives agree with you, the speaker. "Conocer" (to meet/know a person) takes pronoun endings: "conocerla" (to meet you-formal-fem), "conocerte" (to meet you-informal). "Gracias por + infinitive" = "thanks for —ing".',
  roleplay: [
    {
      id: 'pr-r1',
      prompt: 'Te presento a mi mamá.',
      promptEn: 'Let me introduce you to my mom.',
      accept: ['mucho gusto señora encantado de conocerla', 'mucho gusto señora', 'encantado de conocerla'],
      hint: 'Greet her politely and say you\'re pleased to meet her.',
    },
    {
      id: 'pr-r2',
      prompt: 'El gusto es mío, mijo. Bienvenido.',
      promptEn: 'The pleasure is mine, dear. Welcome.',
      accept: ['gracias por recibirme', 'muchas gracias por recibirme', 'gracias por recibirme señora'],
      hint: 'Thank her for having you.',
    },
    {
      id: 'pr-r3',
      prompt: 'Pasa, pasa. ¿Tienes hambre?',
      promptEn: 'Come in. Are you hungry?',
      accept: ['un poquito la verdad', 'un poquito', 'si un poco'],
      hint: 'Admit you\'re a little hungry.',
    },
  ],
  shadowing: ['pr-1', 'pr-2', 'pr-4'],
}
