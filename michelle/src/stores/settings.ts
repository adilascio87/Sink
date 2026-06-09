import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { load, save } from '@/lib/db'

interface SettingsState {
  speechRate: number
  showEnglish: boolean
}

const DEFAULTS: SettingsState = {
  speechRate: 0.9,
  showEnglish: true,
}

export const useSettings = defineStore('settings', () => {
  const saved = load<SettingsState>('settings', DEFAULTS)
  const speechRate = ref(saved.speechRate)
  const showEnglish = ref(saved.showEnglish)

  const slowRate = computed(() => Math.max(0.5, speechRate.value - 0.3))

  watch([speechRate, showEnglish], () => {
    save<SettingsState>('settings', {
      speechRate: speechRate.value,
      showEnglish: showEnglish.value,
    })
  })

  return { speechRate, showEnglish, slowRate }
})
