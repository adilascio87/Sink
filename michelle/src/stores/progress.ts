import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { load, save } from '@/lib/db'

interface ProgressState {
  /** Scenario ids the learner has completed at least once. */
  completed: string[]
  /** Total spoken production attempts. */
  speakingAttempts: number
  /** Sum of speaking similarity scores (0..1) for averaging. */
  speakingScoreSum: number
  /** Day-keys (YYYY-MM-DD) the learner studied, for gentle continuity. */
  studyDays: string[]
  lastStudied: number
}

const DEFAULTS: ProgressState = {
  completed: [],
  speakingAttempts: 0,
  speakingScoreSum: 0,
  studyDays: [],
  lastStudied: 0,
}

function dayKey(ts = Date.now()): string {
  return new Date(ts).toISOString().slice(0, 10)
}

export const useProgress = defineStore('progress', () => {
  const state = ref<ProgressState>(load('progress', DEFAULTS))

  function persist() {
    save('progress', state.value)
  }

  function markStudiedToday() {
    const key = dayKey()
    if (!state.value.studyDays.includes(key))
      state.value.studyDays.push(key)
    state.value.lastStudied = Date.now()
    persist()
  }

  function completeScenario(id: string) {
    if (!state.value.completed.includes(id))
      state.value.completed.push(id)
    markStudiedToday()
  }

  function recordSpeaking(score: number) {
    state.value.speakingAttempts += 1
    state.value.speakingScoreSum += score
    persist()
  }

  const completedCount = computed(() => state.value.completed.length)
  const speakingAttempts = computed(() => state.value.speakingAttempts)
  const speakingAccuracy = computed(() =>
    state.value.speakingAttempts === 0
      ? 0
      : state.value.speakingScoreSum / state.value.speakingAttempts,
  )

  const dayStreak = computed(() => {
    const days = new Set(state.value.studyDays)
    let streak = 0
    const cursor = new Date()
    // Count back from today while consecutive days are present.
    while (days.has(dayKey(cursor.getTime()))) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    }
    return streak
  })

  function isCompleted(id: string) {
    return state.value.completed.includes(id)
  }

  function reset() {
    state.value = { ...DEFAULTS, completed: [], studyDays: [] }
    persist()
  }

  return {
    state,
    completedCount,
    speakingAttempts,
    speakingAccuracy,
    dayStreak,
    completeScenario,
    recordSpeaking,
    markStudiedToday,
    isCompleted,
    reset,
  }
})
