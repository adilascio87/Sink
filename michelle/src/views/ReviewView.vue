<script setup lang="ts">
import type { Rating } from '@/lib/srs'
import { Check } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SpeakButton from '@/components/SpeakButton.vue'
import { findStudyItem } from '@/content/index'
import { useSrs } from '@/stores/srs'

const route = useRoute()
const router = useRouter()
const srs = useSrs()

// Two modes share this screen: scheduled "review" (SRS-graded) and "practice"
// (free drilling of production phrases, with no effect on the schedule).
const practice = computed(() => route.query.mode === 'practice')

const queue = ref<string[]>([])
const startCount = ref(0)
const revealed = ref(false)

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQueue() {
  queue.value = practice.value
    ? shuffle(srs.allCards.filter(c => c.type === 'production').map(c => c.key))
    : srs.dueCards.map(c => c.key)
  startCount.value = queue.value.length
  revealed.value = false
}
buildQueue()
watch(practice, buildQueue)

const currentKey = computed(() => queue.value[0])
const currentCard = computed(() => (currentKey.value ? srs.cards[currentKey.value] : undefined))
const currentItem = computed(() =>
  currentCard.value ? findStudyItem(currentCard.value.itemId) : undefined,
)

const isProduction = computed(() => currentCard.value?.type === 'production')
const cue = computed(() => (isProduction.value ? currentItem.value?.en : currentItem.value?.es))
const answer = computed(() => (isProduction.value ? currentItem.value?.es : currentItem.value?.en))

const reviewedCount = computed(() => startCount.value - queue.value.length)
const progressPct = computed(() =>
  startCount.value === 0 ? 100 : Math.round((reviewedCount.value / startCount.value) * 100),
)

const ratings: { rating: Rating, label: string }[] = [
  { rating: 'again', label: 'Again' },
  { rating: 'hard', label: 'Hard' },
  { rating: 'good', label: 'Good' },
  { rating: 'easy', label: 'Easy' },
]

function advance(repeat: boolean) {
  const key = currentKey.value
  if (!key)
    return
  queue.value.shift()
  if (repeat)
    queue.value.push(key)
  revealed.value = false
}

function grade(rating: Rating) {
  srs.grade(currentKey.value!, rating)
  advance(rating === 'again')
}
</script>

<template>
  <div class="space-y-6">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl">{{ practice ? 'Free practice' : 'Review' }}</h1>
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
      <h2 class="text-xl">{{ practice ? 'All done' : 'Nothing due right now' }}</h2>
      <p class="text-[var(--color-ink-soft)]">
        <template v-if="srs.enrolledCount === 0">
          Learn a situation first — your phrases will show up here to practice.
        </template>
        <template v-else-if="practice">
          You went through every phrase. Come back any time to drill again.
        </template>
        <template v-else>
          Your memory is fresh. Learn a new situation, or do some free practice.
        </template>
      </p>
      <div class="flex flex-wrap justify-center gap-2">
        <button class="btn btn-ghost" @click="router.push('/library')">Library</button>
        <button
          v-if="!practice && srs.enrolledCount > 0"
          class="btn btn-primary"
          @click="router.push('/review?mode=practice')"
        >
          Free practice
        </button>
        <button v-else class="btn btn-primary" @click="router.push('/')">Home</button>
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

        <!-- practice: simple advance, no scheduling -->
        <div v-if="practice" class="flex justify-center gap-2">
          <button class="btn btn-ghost" @click="advance(true)">Practice again</button>
          <button class="btn btn-primary" @click="advance(false)">Next</button>
        </div>

        <!-- review: SRS grading -->
        <div v-else>
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
