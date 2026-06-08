<script setup lang="ts">
import type { Rating } from '@/lib/srs'
import { Check } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import SpeakButton from '@/components/SpeakButton.vue'
import { findStudyItem } from '@/content/index'
import { useSrs } from '@/stores/srs'

const router = useRouter()
const srs = useSrs()

// Snapshot the due queue at entry so rescheduling doesn't disrupt the session.
const queue = ref<string[]>(srs.dueCards.map(c => c.key))
const startCount = queue.value.length
const revealed = ref(false)

const currentKey = computed(() => queue.value[0])
const currentCard = computed(() => (currentKey.value ? srs.cards[currentKey.value] : undefined))
const currentItem = computed(() =>
  currentCard.value ? findStudyItem(currentCard.value.itemId) : undefined,
)

const isProduction = computed(() => currentCard.value?.type === 'production')

// Front shows the cue; back shows the target. Production trains recall→speech.
const cue = computed(() =>
  isProduction.value ? currentItem.value?.en : currentItem.value?.es,
)
const answer = computed(() =>
  isProduction.value ? currentItem.value?.es : currentItem.value?.en,
)

const reviewedCount = computed(() => startCount - queue.value.length)
const progressPct = computed(() =>
  startCount === 0 ? 100 : Math.round((reviewedCount.value / startCount) * 100),
)

const ratings: { rating: Rating, label: string }[] = [
  { rating: 'again', label: 'Again' },
  { rating: 'hard', label: 'Hard' },
  { rating: 'good', label: 'Good' },
  { rating: 'easy', label: 'Easy' },
]

function grade(rating: Rating) {
  const key = currentKey.value
  if (!key)
    return
  srs.grade(key, rating)
  queue.value.shift()
  // A lapse comes back later in the same session.
  if (rating === 'again')
    queue.value.push(key)
  revealed.value = false
}
</script>

<template>
  <div class="space-y-6">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl">Review</h1>
      <span class="text-sm text-[var(--color-muted)]">{{ reviewedCount }} / {{ startCount }}</span>
    </header>

    <div class="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-paper-2)]">
      <div class="h-full bg-[var(--color-clay)] transition-all" :style="{ width: `${progressPct}%` }" />
    </div>

    <!-- empty / done -->
    <div v-if="!currentCard" class="card p-8 text-center space-y-4">
      <div class="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-sage)] text-white">
        <Check class="size-7" />
      </div>
      <h2 class="text-xl">Nothing due right now</h2>
      <p class="text-[var(--color-ink-soft)]">
        Your memory is fresh. Learn a new situation or come back later.
      </p>
      <div class="flex justify-center gap-2">
        <button class="btn btn-ghost" @click="router.push('/library')">Library</button>
        <button class="btn btn-primary" @click="router.push('/')">Home</button>
      </div>
    </div>

    <!-- card -->
    <div v-else class="card p-6 text-center space-y-5">
      <p class="text-xs uppercase tracking-wide text-[var(--color-muted)]">
        {{ isProduction ? 'Say it in Spanish' : 'What does this mean?' }}
      </p>
      <p class="text-2xl">{{ cue }}</p>

      <button v-if="!revealed" class="btn btn-ghost w-full" @click="revealed = true">
        Reveal answer
      </button>

      <div v-else class="space-y-4">
        <div class="border-t border-[var(--color-line)] pt-4">
          <p class="text-xl font-medium">{{ answer }}</p>
          <div class="mt-3 flex justify-center">
            <SpeakButton :text="isProduction ? (answer ?? '') : (currentItem?.es ?? '')" label="Listen" />
          </div>
        </div>
        <div>
          <p class="mb-2 text-xs text-[var(--color-muted)]">How well did you recall it?</p>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="r in ratings"
              :key="r.rating"
              class="btn btn-ghost px-2 py-2 text-xs"
              :class="r.rating === 'good' || r.rating === 'easy' ? 'border-[var(--color-sage)]' : ''"
              @click="grade(r.rating)"
            >
              {{ r.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
