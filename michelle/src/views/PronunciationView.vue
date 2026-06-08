<script setup lang="ts">
import { Check, Mic, Volume2 } from 'lucide-vue-next'
import { reactive, ref } from 'vue'
import { sounds } from '@/content/pronunciation'
import { listenOnce, recognitionSupported, scoreAnswer, speak, ttsSupported } from '@/lib/speech'
import { useSettings } from '@/stores/settings'

const settings = useSettings()
const supported = ttsSupported()

function say(text: string, slow = false) {
  if (supported)
    speak(text, slow ? settings.slowRate : settings.speechRate)
}

// Optional active practice: say the word, get a score, where the browser allows.
const canRecognize = ref(recognitionSupported() && settings.useRecognition)
const listeningKey = ref('')
const results = reactive<Record<string, number>>({})

async function practice(es: string) {
  if (!canRecognize.value || listeningKey.value)
    return
  listeningKey.value = es
  try {
    const heard = await listenOnce()
    results[es] = scoreAnswer(heard, [es])
  }
  catch {
    // ignore — recognition unavailable this attempt
  }
  finally {
    listeningKey.value = ''
  }
}
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl">Sounds</h1>
      <p class="mt-1 max-w-prose text-[var(--color-ink-soft)]">
        The handful of sounds that decide whether your family understands you. Tap to hear,
        then <em>say it back</em>.
      </p>
    </header>

    <section v-for="s in sounds" :key="s.id" class="card p-5 space-y-3">
      <div class="flex items-baseline gap-3">
        <span class="font-[family-name:var(--font-display)] text-xl text-[var(--color-ink)]">{{ s.symbol }}</span>
        <h2 class="text-base font-medium">{{ s.title }}</h2>
      </div>
      <p class="text-sm text-[var(--color-ink-soft)]">{{ s.tip }}</p>

      <div class="flex flex-wrap gap-2 pt-1">
        <div
          v-for="ex in s.examples"
          :key="ex.es"
          class="flex items-center overflow-hidden rounded-full border border-[var(--color-line)]"
          :class="results[ex.es] >= 0.6 ? 'border-[var(--color-sage)]' : ''"
        >
          <button class="px-3 py-1.5 text-sm hover:bg-[var(--color-paper-2)]" :title="ex.en" @click="say(ex.es)">
            {{ ex.es }}
            <span class="ml-1 text-[var(--color-muted)]">· {{ ex.en }}</span>
          </button>
          <button
            v-if="canRecognize"
            class="border-l border-[var(--color-line)] px-2 py-1.5 hover:bg-[var(--color-paper-2)]"
            :class="{ 'animate-pulse text-[var(--color-clay)]': listeningKey === ex.es }"
            :title="`Say “${ex.es}” to check your pronunciation`"
            @click="practice(ex.es)"
          >
            <Check v-if="results[ex.es] >= 0.6" class="size-3.5 text-[var(--color-sage)]" />
            <Mic v-else class="size-3.5" />
          </button>
        </div>
      </div>

      <div v-if="s.pairs?.length" class="space-y-2 border-t border-[var(--color-line)] pt-3">
        <p class="text-xs uppercase tracking-wide text-[var(--color-muted)]">Hear the difference</p>
        <div v-for="p in s.pairs" :key="p.a + p.b" class="flex items-center gap-2 text-sm">
          <button class="btn btn-ghost px-3 py-1.5" @click="say(p.a, true)">
            <Volume2 class="size-3.5" /> {{ p.a }}
          </button>
          <span class="text-[var(--color-muted)]">vs</span>
          <button class="btn btn-ghost px-3 py-1.5" @click="say(p.b, true)">
            <Volume2 class="size-3.5" /> {{ p.b }}
          </button>
          <span class="text-[var(--color-ink-soft)]">— {{ p.note }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
