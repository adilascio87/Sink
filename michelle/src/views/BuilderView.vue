<script setup lang="ts">
import type { Filler, Pattern } from '@/content/patterns'
import { Shuffle, Volume2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { composeEn, composeEs, patterns } from '@/content/patterns'
import { speak, ttsSupported } from '@/lib/speech'
import { useSettings } from '@/stores/settings'

const settings = useSettings()
const supported = ttsSupported()

const pIndex = ref(0)
const fIndex = ref(0)

const pattern = computed<Pattern>(() => patterns[pIndex.value])
const filler = computed<Filler>(() => pattern.value.fillers[fIndex.value])
const sentenceEs = computed(() => composeEs(pattern.value, filler.value))
const sentenceEn = computed(() => composeEn(pattern.value, filler.value))

function say() {
  if (supported)
    speak(sentenceEs.value, settings.speechRate)
}

function selectPattern(i: number) {
  pIndex.value = i
  fIndex.value = 0
  say()
}

function selectFiller(i: number) {
  fIndex.value = i
  say()
}

function shuffleFiller() {
  const n = pattern.value.fillers.length
  if (n <= 1)
    return
  let next = fIndex.value
  while (next === fIndex.value)
    next = Math.floor(Math.random() * n)
  selectFiller(next)
}
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl">Sentence builder</h1>
      <p class="mt-1 max-w-prose text-[var(--color-ink-soft)]">
        Learn a frame, then swap the ending to say your own sentences. Tap a piece, hear it,
        and <em>repeat it out loud</em> — this is how you start speaking freely with family.
      </p>
    </header>

    <!-- pattern picker -->
    <div class="-mx-4 overflow-x-auto px-4">
      <div class="flex w-max gap-2">
        <button
          v-for="(p, i) in patterns"
          :key="p.id"
          class="rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors"
          :class="i === pIndex
            ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
            : 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-2)]'"
          @click="selectPattern(i)"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <!-- composed sentence -->
    <section class="card p-6 text-center space-y-4">
      <p class="text-sm text-[var(--color-muted)]">{{ pattern.frameEn.replace('___', '…') }}</p>
      <p class="text-3xl leading-snug">{{ sentenceEs }}</p>
      <p v-if="settings.showEnglish" class="text-[var(--color-ink-soft)]">{{ sentenceEn }}</p>
      <div class="flex justify-center gap-2 pt-1">
        <button class="btn btn-primary" :disabled="!supported" @click="say">
          <Volume2 class="size-4" /> Hear &amp; repeat
        </button>
        <button class="btn btn-ghost" @click="shuffleFiller">
          <Shuffle class="size-4" /> Shuffle
        </button>
      </div>
    </section>

    <!-- fillers -->
    <section>
      <p class="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--color-muted)]">Swap the ending</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(f, i) in pattern.fillers"
          :key="f.es"
          class="rounded-full border px-3.5 py-1.5 text-sm transition-colors"
          :class="i === fIndex
            ? 'border-[var(--color-sage)] bg-[var(--color-paper-2)] text-[var(--color-ink)]'
            : 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-2)]'"
          @click="selectFiller(i)"
        >
          {{ f.es }}
        </button>
      </div>
    </section>

    <p class="card bg-[var(--color-paper-2)] p-4 text-sm text-[var(--color-ink-soft)]">
      {{ pattern.note }}
    </p>
  </div>
</template>
