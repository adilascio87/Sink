import type { Scenario } from '@/content/types'
import { afecto } from '@/content/es/afecto'
import { almuerzo } from '@/content/es/almuerzo'
import { ayuda } from '@/content/es/ayuda'
import { charla } from '@/content/es/charla'
import { clima } from '@/content/es/clima'
import { direcciones } from '@/content/es/direcciones'
import { familia } from '@/content/es/familia'
import { farmacia } from '@/content/es/farmacia'
import { futuro } from '@/content/es/futuro'
import { greetings } from '@/content/es/greetings'
import { historia } from '@/content/es/historia'
import { hotel } from '@/content/es/hotel'
import { llamada } from '@/content/es/llamada'
import { mercado } from '@/content/es/mercado'
import { numeros } from '@/content/es/numeros'
import { opinion } from '@/content/es/opinion'
import { pasado } from '@/content/es/pasado'
import { planes } from '@/content/es/planes'
import { presentar } from '@/content/es/presentar'
import { restaurante } from '@/content/es/restaurante'
import { ropa } from '@/content/es/ropa'
import { sobremesa } from '@/content/es/sobremesa'
import { taxi } from '@/content/es/taxi'
import { tienda } from '@/content/es/tienda'
import { composeEn, composeEs, patterns } from '@/content/patterns'
import { vocabPacks } from '@/content/vocab'

// Scenarios ordered as a learning path across tiers. The "family & connection"
// cluster (familia → sobremesa) is the heart of the app's purpose: real
// conversation with relatives. Adding a scenario is just appending here.
export const scenarios: Scenario[] = [
  greetings,
  almuerzo,
  numeros,
  mercado,
  tienda,
  direcciones,
  taxi,
  charla,
  planes,
  restaurante,
  ropa,
  clima,
  familia,
  presentar,
  llamada,
  afecto,
  sobremesa,
  hotel,
  ayuda,
  farmacia,
  futuro,
  pasado,
  historia,
  opinion,
]

export function getScenario(id: string): Scenario | undefined {
  return scenarios.find(s => s.id === id)
}

/** A learnable item flattened from a scenario, ready to become SRS cards. */
export interface StudyItem {
  id: string
  scenarioId: string
  es: string
  en: string
  kind: 'chunk' | 'vocab'
}

/** All chunks + vocab in a scenario as study items. */
export function studyItems(scenario: Scenario): StudyItem[] {
  const chunks = scenario.chunks.map(c => ({
    id: c.id,
    scenarioId: scenario.id,
    es: c.es,
    en: c.en,
    kind: 'chunk' as const,
  }))
  const vocab = scenario.vocab.map(v => ({
    id: v.id,
    scenarioId: scenario.id,
    es: v.es,
    en: v.en,
    kind: 'vocab' as const,
  }))
  return [...chunks, ...vocab]
}

// Sentence Builder frames, exposed as study items so the productive patterns
// you learn can also be reviewed by spaced repetition. Each pattern contributes
// its model sentence (frame + first filler).
export function patternStudyItems(): StudyItem[] {
  return patterns.map(p => ({
    id: `pat-${p.id}`,
    scenarioId: 'builder',
    es: composeEs(p, p.fillers[0]),
    en: composeEn(p, p.fillers[0]),
    kind: 'chunk' as const,
  }))
}

// Thematic vocabulary packs, exposed as study items for spaced repetition.
export function vocabStudyItems(): StudyItem[] {
  const items: StudyItem[] = []
  for (const pack of vocabPacks) {
    pack.words.forEach((w, i) => items.push({
      id: `voc-${pack.id}-${i}`,
      scenarioId: `vocab:${pack.id}`,
      es: w.es,
      en: w.en,
      kind: 'vocab',
    }))
  }
  return items
}

export function vocabItemsForPack(packId: string): StudyItem[] {
  return vocabStudyItems().filter(i => i.scenarioId === `vocab:${packId}`)
}

/** Total lexical items available to learn across the whole app. */
export function totalLexicalItems(): number {
  const scenarioItems = scenarios.reduce((n, s) => n + s.chunks.length + s.vocab.length, 0)
  return scenarioItems + patternStudyItems().length + vocabStudyItems().length
}

/** Look up a study item by its id across scenarios, builder frames and vocab. */
export function findStudyItem(itemId: string): StudyItem | undefined {
  for (const scenario of scenarios) {
    const item = studyItems(scenario).find(i => i.id === itemId)
    if (item)
      return item
  }
  return patternStudyItems().find(i => i.id === itemId)
    ?? vocabStudyItems().find(i => i.id === itemId)
}
