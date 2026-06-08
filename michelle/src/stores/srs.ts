import type { CardType, Rating, SrsCard } from '@/lib/srs'
import type { StudyItem } from '@/content/index'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { createCard, dueCards as filterDue, review as reviewCard } from '@/lib/srs'
import { load, save } from '@/lib/db'

// Each study item becomes two cards: comprehension (es→meaning) and production
// (meaning→spoken es). This is what makes the difference between recognizing a
// phrase and actually being able to say it.
const CARD_TYPES: CardType[] = ['comprehension', 'production']

export const useSrs = defineStore('srs', () => {
  const cards = ref<Record<string, SrsCard>>(load('srs', {}))

  function persist() {
    save('srs', cards.value)
  }

  /** Create cards for a scenario's items if they don't exist yet. */
  function enroll(items: StudyItem[]) {
    let added = false
    for (const item of items) {
      for (const type of CARD_TYPES) {
        const key = `${item.id}:${type}`
        if (!cards.value[key]) {
          cards.value[key] = createCard(item.id, type, item.scenarioId)
          added = true
        }
      }
    }
    if (added)
      persist()
  }

  function grade(key: string, rating: Rating) {
    const card = cards.value[key]
    if (!card)
      return
    cards.value[key] = reviewCard(card, rating)
    persist()
  }

  const allCards = computed(() => Object.values(cards.value))
  const dueCards = computed(() => filterDue(allCards.value))
  const dueCount = computed(() => dueCards.value.length)
  const enrolledCount = computed(() => allCards.value.length)

  function dueForScenario(scenarioId: string): SrsCard[] {
    return filterDue(allCards.value.filter(c => c.scenarioId === scenarioId))
  }

  function reset() {
    cards.value = {}
    persist()
  }

  return {
    cards,
    allCards,
    dueCards,
    dueCount,
    enrolledCount,
    enroll,
    grade,
    dueForScenario,
    reset,
  }
})
