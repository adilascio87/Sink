<script setup lang="ts">
import { ref } from 'vue'
import { exportAll, importAll } from '@/lib/db'
import { recognitionSupported, ttsSupported } from '@/lib/speech'
import { useProgress } from '@/stores/progress'
import { useSettings } from '@/stores/settings'
import { useSrs } from '@/stores/srs'

const settings = useSettings()
const srs = useSrs()
const progress = useProgress()

const ttsOk = ttsSupported()
const recogOk = recognitionSupported()
const fileInput = ref<HTMLInputElement>()
const message = ref('')

function flash(text: string) {
  message.value = text
  setTimeout(() => (message.value = ''), 2500)
}

function exportData() {
  const blob = new Blob([JSON.stringify(exportAll(), null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `michelle-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  flash('Backup downloaded.')
}

function importData(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      importAll(JSON.parse(String(reader.result)))
      flash('Imported — reloading…')
      setTimeout(() => location.reload(), 800)
    }
    catch {
      flash('That file could not be read.')
    }
  }
  reader.readAsText(file)
}

function resetAll() {
  // eslint-disable-next-line no-alert
  if (!confirm('Erase all progress on this device? This cannot be undone.'))
    return
  srs.reset()
  progress.reset()
  flash('Progress cleared.')
}
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl">Settings</h1>
      <p class="mt-1 text-[var(--color-ink-soft)]">Everything is stored on this device only.</p>
    </header>

    <section class="card divide-y divide-[var(--color-line)]">
      <div class="p-4">
        <div class="flex items-center justify-between">
          <label for="rate" class="font-medium">Speaking speed</label>
          <span class="text-sm text-[var(--color-muted)]">{{ settings.speechRate.toFixed(1) }}×</span>
        </div>
        <input
          id="rate"
          v-model.number="settings.speechRate"
          type="range" min="0.6" max="1.2" step="0.1"
          class="mt-3 w-full accent-[var(--color-clay)]"
        >
        <p class="mt-1 text-xs text-[var(--color-muted)]">How fast the Spanish voice speaks. Slow mode subtracts a little more.</p>
      </div>

      <div class="flex items-center justify-between p-4">
        <div>
          <p class="font-medium">Speech recognition</p>
          <p class="text-xs text-[var(--color-muted)]">Score spoken answers in roleplay using your mic.</p>
        </div>
        <input v-model="settings.useRecognition" type="checkbox" class="size-5 accent-[var(--color-clay)]" :disabled="!recogOk">
      </div>

      <div class="flex items-center justify-between p-4">
        <div>
          <p class="font-medium">Show English</p>
          <p class="text-xs text-[var(--color-muted)]">Hide it once you want a tougher challenge.</p>
        </div>
        <input v-model="settings.showEnglish" type="checkbox" class="size-5 accent-[var(--color-clay)]">
      </div>
    </section>

    <!-- capability notice -->
    <section class="card bg-[var(--color-paper-2)] p-4 text-sm text-[var(--color-ink-soft)]">
      <p class="font-medium text-[var(--color-ink)]">This browser</p>
      <ul class="mt-2 space-y-1">
        <li>Audio (text-to-speech): <strong>{{ ttsOk ? 'available' : 'not available' }}</strong></li>
        <li>Microphone (speech recognition): <strong>{{ recogOk ? 'available' : 'not available — roleplay falls back to self-grading' }}</strong></li>
      </ul>
    </section>

    <!-- data -->
    <section class="space-y-2">
      <h2 class="text-sm font-medium uppercase tracking-wide text-[var(--color-muted)]">Your data</h2>
      <div class="flex flex-wrap gap-2">
        <button class="btn btn-ghost" @click="exportData">Export backup</button>
        <button class="btn btn-ghost" @click="fileInput?.click()">Import backup</button>
        <button class="btn btn-ghost text-[var(--color-clay)]" @click="resetAll">Reset progress</button>
        <input ref="fileInput" type="file" accept="application/json" class="hidden" @change="importData">
      </div>
      <p v-if="message" class="text-sm text-[var(--color-sage)]">{{ message }}</p>
    </section>
  </div>
</template>
