<script setup lang="ts">
import type { VocabPack } from '@/content/vocab'
import { ArrowLeft, Check } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import SpeakButton from '@/components/SpeakButton.vue'
import { vocabItemsForPack } from '@/content/index'
import { totalVocabWords, vocabPacks } from '@/content/vocab'
import { useSrs } from '@/stores/srs'

const srs = useSrs()

const selected = ref<VocabPack | null>(null)
const total = totalVocabWords()

const enrolledPacks = computed(() => {
  const set = new Set(srs.allCards.map(c => c.scenarioId))
  return set
})

function isAdded(pack: VocabPack) {
  return enrolledPacks.value.has(`vocab:${pack.id}`)
}

function addPack(pack: VocabPack) {
  srs.enroll(vocabItemsForPack(pack.id))
}
</script>

<template>
  <div class="space-y-6">
    <!-- pack detail -->
    <template v-if="selected">
      <button class="flex items-center gap-1 text-sm text-[var(--color-ink-soft)] hover:underline" @click="selected = null">
        <ArrowLeft class="size-4" /> All topics
      </button>
      <header class="flex items-start justify-between gap-3">
        <div>
          <h1 class="text-2xl">{{ selected.title }}</h1>
          <p class="mt-1 text-sm text-[var(--color-muted)]">{{ selected.words.length }} words · {{ selected.level }}</p>
        </div>
        <button v-if="!isAdded(selected)" class="btn btn-primary shrink-0" @click="addPack(selected)">
          Add to Review
        </button>
        <span v-else class="pill shrink-0"><Check class="size-3.5" /> in Review</span>
      </header>
      <ul class="card divide-y divide-[var(--color-line)] p-0">
        <li v-for="w in selected.words" :key="w.es" class="flex items-center justify-between gap-3 px-4 py-2.5">
          <div>
            <p class="font-medium">{{ w.es }}</p>
            <p class="text-sm text-[var(--color-ink-soft)]">{{ w.en }}</p>
          </div>
          <SpeakButton :text="w.es" />
        </li>
      </ul>
    </template>

    <!-- pack list -->
    <template v-else>
      <header>
        <h1 class="text-2xl">Vocabulary</h1>
        <p class="mt-1 max-w-prose text-[var(--color-ink-soft)]">
          {{ total }} words across everyday topics, growing toward high-school breadth. Open a topic,
          listen, then add it to your spaced-repetition review.
        </p>
      </header>
      <ul class="grid grid-cols-2 gap-3">
        <li v-for="pack in vocabPacks" :key="pack.id">
          <button
            class="card flex h-full w-full flex-col p-4 text-left transition-shadow hover:shadow-sm"
            @click="selected = pack"
          >
            <span class="font-medium">{{ pack.title }}</span>
            <span class="mt-1 text-xs text-[var(--color-muted)]">{{ pack.words.length }} words · {{ pack.level }}</span>
            <span v-if="isAdded(pack)" class="mt-2 inline-flex items-center gap-1 text-xs text-[var(--color-sage)]">
              <Check class="size-3.5" /> in Review
            </span>
          </button>
        </li>
      </ul>
    </template>
  </div>
</template>
