import type { Scenario } from '@/content/types'
import { almuerzo } from '@/content/es/almuerzo'
import { charla } from '@/content/es/charla'
import { greetings } from '@/content/es/greetings'
import { mercado } from '@/content/es/mercado'
import { taxi } from '@/content/es/taxi'
import { tienda } from '@/content/es/tienda'

// The Tier 1 "Survival" pack (plus one Tier 2 taster), ordered as a learning
// path. Adding a scenario is just appending here — the engine is content-driven.
export const scenarios: Scenario[] = [
  greetings,
  almuerzo,
  mercado,
  tienda,
  taxi,
  charla,
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

/** Look up a study item by its id across all scenarios. */
export function findStudyItem(itemId: string): StudyItem | undefined {
  for (const scenario of scenarios) {
    const item = studyItems(scenario).find(i => i.id === itemId)
    if (item)
      return item
  }
  return undefined
}
