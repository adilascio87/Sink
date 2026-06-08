<script setup lang="ts">
import { ArrowRight, Check, Mic, RotateCcw } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SpeakButton from '@/components/SpeakButton.vue'
import { getScenario } from '@/content/index'
import { listenOnce, recognitionSupported, scoreAnswer, speak, ttsSupported } from '@/lib/speech'
import { useProgress } from '@/stores/progress'
import { useSettings } from '@/stores/settings'

const route = useRoute()
const router = useRouter()
const settings = useSettings()
const progress = useProgress()

const scenario = computed(() => getScenario(String(route.params.id)))
const idx = ref(0)
const finished = ref(false)

const line = computed(() => scenario.value?.dialogue[idx.value])
const isYou = computed(() => line.value?.speaker === 'you')
const canRecognize = computed(() => recognitionSupported() && settings.useRecognition)

const status = ref<'idle' | 'listening' | 'result'>('idle')
const transcript = ref('')
const score = ref(0)
const revealed = ref(false)

const progressPct = computed(() => {
  const total = scenario.value?.dialogue.length ?? 1
  return Math.round(((finished.value ? total : idx.value) / total) * 100)
})

const feedback = computed(() => {
  if (score.value >= 0.85)
    return '¡Perfecto!'
  if (score.value >= 0.6)
    return 'Casi — close!'
  return 'Keep practicing'
})

// On entering a line, reset turn state and auto-play the other person's line.
watch(idx, () => {
  status.value = 'idle'
  transcript.value = ''
  score.value = 0
  revealed.value = false
  if (line.value && line.value.speaker === 'them' && ttsSupported())
    speak(line.value.es, settings.speechRate)
}, { immediate: true })

function next() {
  if (!scenario.value)
    return
  if (idx.value < scenario.value.dialogue.length - 1)
    idx.value += 1
  else
    finished.value = true
}

async function record() {
  if (!line.value || !canRecognize.value)
    return
  status.value = 'listening'
  try {
    const t = await listenOnce()
    transcript.value = t
    score.value = scoreAnswer(t, [line.value.es])
    progress.recordSpeaking(score.value)
    revealed.value = true
    status.value = 'result'
  }
  catch {
    status.value = 'idle'
  }
}

function selfGrade(got: boolean) {
  score.value = got ? 1 : 0.4
  progress.recordSpeaking(score.value)
  revealed.value = true
  status.value = 'result'
}

function restart() {
  finished.value = false
  idx.value = 0
  status.value = 'idle'
  revealed.value = false
}
</script>

<template>
  <div v-if="!scenario" class="card p-6 text-center">
    <p>Scenario not found.</p>
    <button class="btn btn-ghost mt-4" @click="router.push('/library')">Back to library</button>
  </div>

  <div v-else class="space-y-6">
    <header class="flex items-center justify-between gap-3">
      <div>
        <h1 class="text-xl">{{ scenario.title }}</h1>
        <p class="text-sm text-[var(--color-muted)]">Full conversation — you speak your lines</p>
      </div>
      <button
        class="shrink-0 rounded-full border border-[var(--color-line)] px-2.5 py-1 text-xs hover:bg-[var(--color-paper-2)]"
        @click="settings.showEnglish = !settings.showEnglish"
      >
        {{ settings.showEnglish ? 'EN on' : 'ES only' }}
      </button>
    </header>

    <div class="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-paper-2)]">
      <div class="h-full bg-[var(--color-clay)] transition-all" :style="{ width: `${progressPct}%` }" />
    </div>

    <!-- finished -->
    <section v-if="finished" class="card p-6 text-center space-y-4">
      <div class="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-sage)] text-white">
        <Check class="size-7" />
      </div>
      <h2 class="text-xl">You made it through the whole conversation</h2>
      <p class="text-[var(--color-ink-soft)]">That's the real thing — held end to end. Run it again to get smoother.</p>
      <div class="flex justify-center gap-2">
        <button class="btn btn-ghost" @click="restart"><RotateCcw class="size-4" /> Again</button>
        <button class="btn btn-primary" @click="router.push('/library')">Library</button>
      </div>
    </section>

    <!-- their line -->
    <section v-else-if="line && !isYou" class="card p-5 space-y-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-[10px] uppercase tracking-wide text-[var(--color-muted)]">Them</p>
          <p class="mt-0.5 text-lg">{{ line.es }}</p>
          <p v-if="settings.showEnglish" class="text-sm text-[var(--color-ink-soft)]">{{ line.en }}</p>
        </div>
        <SpeakButton :text="line.es" />
      </div>
      <button class="btn btn-primary w-full" @click="next">Continue <ArrowRight class="size-4" /></button>
    </section>

    <!-- your line -->
    <section v-else-if="line" class="card p-5 space-y-4">
      <div>
        <p class="text-[10px] uppercase tracking-wide text-[var(--color-muted)]">Your turn</p>
        <p v-if="settings.showEnglish" class="mt-0.5 text-[var(--color-ink-soft)]">Say: “{{ line.en }}”</p>
        <p v-else class="mt-0.5 text-[var(--color-muted)]">Respond in Spanish.</p>
      </div>

      <template v-if="!revealed">
        <template v-if="canRecognize">
          <button v-if="status !== 'listening'" class="btn btn-primary w-full" @click="record">
            <Mic class="size-4" /> Tap and say it
          </button>
          <p v-else class="py-2 text-center text-[var(--color-clay)] animate-pulse">Listening… speak now</p>
        </template>
        <div v-else class="flex gap-2">
          <button class="btn btn-ghost flex-1" @click="selfGrade(false)">Reveal</button>
          <button class="btn btn-primary flex-1" @click="selfGrade(true)">I said it</button>
        </div>
      </template>

      <div v-else class="space-y-3 border-t border-[var(--color-line)] pt-4">
        <p v-if="transcript" class="text-center text-sm text-[var(--color-ink-soft)]">You said: “{{ transcript }}”</p>
        <p v-if="status === 'result' && transcript" class="text-center text-sm font-medium">{{ feedback }}</p>
        <p class="text-center text-lg font-medium">{{ line.es }}</p>
        <div class="flex justify-center gap-2">
          <SpeakButton :text="line.es" label="Hear it" />
          <button class="btn btn-primary" @click="next">Next <ArrowRight class="size-4" /></button>
        </div>
      </div>
    </section>
  </div>
</template>
