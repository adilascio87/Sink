<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { computed } from 'vue'
import { scenarios } from '@/content/index'
import { useProgress } from '@/stores/progress'
import { useSrs } from '@/stores/srs'

const progress = useProgress()
const srs = useSrs()

const coverage = computed(() => Math.round((progress.completedCount / scenarios.length) * 100))
const accuracyPct = computed(() => Math.round(progress.speakingAccuracy * 100))

// "Active" = phrases whose memory has had a chance to consolidate.
const activePhrases = computed(() => srs.allCards.filter(c => c.reps >= 1 && c.type === 'production').length)

const completedScenarios = computed(() =>
  scenarios.filter(s => progress.isCompleted(s.id)),
)
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl">Your progress</h1>
      <p class="mt-1 text-[var(--color-ink-soft)]">Measured in conversation, not points.</p>
    </header>

    <!-- headline -->
    <section class="card p-6">
      <p class="text-sm text-[var(--color-muted)]">Situations you can hold a conversation in</p>
      <p class="mt-1 text-4xl font-semibold">
        {{ progress.completedCount }}<span class="text-xl text-[var(--color-muted)]"> / {{ scenarios.length }}</span>
      </p>
      <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--color-paper-2)]">
        <div class="h-full bg-[var(--color-sage)] transition-all" :style="{ width: `${coverage}%` }" />
      </div>
    </section>

    <!-- stats grid -->
    <section class="grid grid-cols-2 gap-3">
      <div class="card p-5">
        <p class="text-3xl font-semibold">{{ activePhrases }}</p>
        <p class="mt-1 text-sm text-[var(--color-muted)]">phrases you can produce</p>
      </div>
      <div class="card p-5">
        <p class="text-3xl font-semibold">{{ progress.speakingAttempts }}</p>
        <p class="mt-1 text-sm text-[var(--color-muted)]">times you spoke aloud</p>
      </div>
      <div class="card p-5">
        <p class="text-3xl font-semibold">{{ accuracyPct }}%</p>
        <p class="mt-1 text-sm text-[var(--color-muted)]">speaking accuracy</p>
      </div>
      <div class="card p-5">
        <p class="text-3xl font-semibold">{{ srs.dueCount }}</p>
        <p class="mt-1 text-sm text-[var(--color-muted)]">cards due now</p>
      </div>
    </section>

    <section v-if="progress.dayStreak > 0" class="card p-4 text-sm text-[var(--color-ink-soft)]">
      You've practiced {{ progress.dayStreak }} day{{ progress.dayStreak === 1 ? '' : 's' }} in a row — gentle continuity, no pressure.
    </section>

    <section v-if="completedScenarios.length" class="space-y-2">
      <h2 class="text-sm font-medium uppercase tracking-wide text-[var(--color-muted)]">What you can do now</h2>
      <ul class="card divide-y divide-[var(--color-line)] p-0">
        <li v-for="s in completedScenarios" :key="s.id" class="flex items-start gap-3 px-4 py-3">
          <Check class="mt-0.5 size-4 shrink-0 text-[var(--color-sage)]" />
          <div>
            <p class="font-medium">{{ s.title }}</p>
            <p class="text-sm text-[var(--color-ink-soft)]">{{ s.goal }}</p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
