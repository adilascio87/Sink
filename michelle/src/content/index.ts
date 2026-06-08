import type { Scenario } from '@/content/types'
import { afecto } from '@/content/es/afecto'
import { almuerzo } from '@/content/es/almuerzo'
import { charla } from '@/content/es/charla'
import { clima } from '@/content/es/clima'
import { direcciones } from '@/content/es/direcciones'
import { familia } from '@/content/es/familia'
import { farmacia } from '@/content/es/farmacia'
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
import { sobremesa } from '@/content/es/sobremesa'
import { taxi } from '@/content/es/taxi'
import { tienda } from '@/content/es/tienda'
import { composeEn, composeEs, patterns } from '@/content/patterns'

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
  clima,
  familia,
  presentar,
  llamada,
  afecto,
  sobremesa,
  hotel,
  farmacia,
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

/** Look up a study item by its id across all scenarios and builder frames. */
export function findStudyItem(itemId: string): StudyItem | undefined {
  for (const scenario of scenarios) {
    const item = studyItems(scenario).find(i => i.id === itemId)
    if (item)
      return item
  }
  return patternStudyItems().find(i => i.id === itemId)
}
