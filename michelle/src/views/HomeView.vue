<script setup lang="ts">
import { ArrowRight, BookOpen, Repeat } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { scenarios } from '@/content/index'
import { useProgress } from '@/stores/progress'
import { useSrs } from '@/stores/srs'

const router = useRouter()
const srs = useSrs()
const progress = useProgress()

// Next scenario = first not-yet-completed, else loop back to the last one.
const nextScenario = computed(
  () => scenarios.find(s => !progress.isCompleted(s.id)) ?? scenarios[scenarios.length - 1],
)

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12)
    return 'Buenos días'
  if (h < 19)
    return 'Buenas tardes'
  return 'Buenas noches'
})

const tools = [
  { to: '/conjugation', label: 'Tenses', desc: 'Master past, present & future' },
  { to: '/vocabulary', label: 'Vocabulary', desc: 'Words by topic, into review' },
  { to: '/builder', label: 'Sentence builder', desc: 'Build your own sentences' },
  { to: '/verbs', label: 'Key verbs', desc: 'Conjugations & a quiz' },
  { to: '/pronunciation', label: 'Sounds', desc: 'Be understood clearly' },
  { to: '/phrasebook', label: 'Phrasebook', desc: 'Every phrase, tap to hear' },
]

function start() {
  router.push(`/scenario/${nextScenario.value.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <section>
      <p class="text-sm text-[var(--color-muted)]">{{ greeting }}.</p>
      <h1 class="mt-1 text-2xl">Let's build real conversation.</h1>
      <p class="mt-2 max-w-prose text-[var(--color-ink-soft)]">
        One focused session: review what's fading, learn a real situation, and
        <em>say it out loud</em>. No streaks to protect — just Spanish you can use.
      </p>
      <button
        class="mt-3 text-sm text-[var(--color-ink-soft)] underline-offset-4 hover:underline"
        @click="router.push('/plan')"
      >
        New here? Follow the 7-day starter path →
      </button>
    </section>

    <!-- Review due -->
    <button
      v-if="srs.dueCount > 0"
      class="card flex w-full items-center justify-between p-5 text-left transition-shadow hover:shadow-sm"
      @click="router.push('/review')"
    >
      <div class="flex items-center gap-4">
        <div class="flex size-11 items-center justify-center rounded-full bg-[var(--color-paper-2)]">
          <Repeat class="size-5 text-[var(--color-clay)]" />
        </div>
        <div>
          <p class="font-medium">Warm-up review</p>
          <p class="text-sm text-[var(--color-ink-soft)]">
            {{ srs.dueCount }} card{{ srs.dueCount === 1 ? '' : 's' }} ready to reinforce
          </p>
        </div>
      </div>
      <ArrowRight class="size-5 text-[var(--color-muted)]" />
    </button>

    <!-- Today's scenario -->
    <section class="card p-6">
      <div class="flex items-center gap-2">
        <span class="pill">Tier {{ nextScenario.tier }}</span>
        <span class="pill">{{ nextScenario.cefr }}</span>
        <span v-if="progress.isCompleted(nextScenario.id)" class="pill">revisiting</span>
      </div>
      <h2 class="mt-3 text-xl">{{ nextScenario.title }}</h2>
      <p class="mt-1 text-[var(--color-ink-soft)]">{{ nextScenario.goal }}</p>
      <button class="btn btn-primary mt-5" @click="start">
        <BookOpen class="size-4" />
        Start session
      </button>
    </section>

    <!-- Free practice (drill anytime, e.g. in the car) -->
    <div v-if="srs.enrolledCount > 0" class="text-center">
      <button
        class="text-sm text-[var(--color-ink-soft)] underline-offset-4 hover:underline"
        @click="router.push('/review?mode=practice')"
      >
        Or do a quick free practice →
      </button>
    </div>

    <!-- Sharpen your speaking -->
    <section>
      <h2 class="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--color-muted)]">Sharpen your speaking</h2>
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="tool in tools"
          :key="tool.to"
          class="card p-4 text-left transition-shadow hover:shadow-sm"
          @click="router.push(tool.to)"
        >
          <p class="font-medium">{{ tool.label }}</p>
          <p class="mt-0.5 text-xs text-[var(--color-muted)]">{{ tool.desc }}</p>
        </button>
      </div>
    </section>

    <!-- At a glance -->
    <section class="grid grid-cols-3 gap-3 text-center">
      <div class="card p-4">
        <p class="text-2xl font-semibold">{{ progress.completedCount }}</p>
        <p class="mt-1 text-xs text-[var(--color-muted)]">situations learned</p>
      </div>
      <div class="card p-4">
        <p class="text-2xl font-semibold">{{ srs.enrolledCount }}</p>
        <p class="mt-1 text-xs text-[var(--color-muted)]">phrases in memory</p>
      </div>
      <div class="card p-4">
        <p class="text-2xl font-semibold">{{ progress.speakingAttempts }}</p>
        <p class="mt-1 text-xs text-[var(--color-muted)]">times you spoke</p>
      </div>
    </section>
  </div>
</template>
