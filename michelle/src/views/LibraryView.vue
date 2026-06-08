<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { scenarios } from '@/content/index'
import { useProgress } from '@/stores/progress'

const router = useRouter()
const progress = useProgress()

const tiers = computed(() => {
  const labels: Record<number, string> = {
    1: 'Tier 1 · Survival',
    2: 'Tier 2 · Social',
    3: 'Tier 3 · Situational',
    4: 'Tier 4 · Fluency',
  }
  const groups = new Map<number, typeof scenarios>()
  for (const s of scenarios) {
    if (!groups.has(s.tier))
      groups.set(s.tier, [])
    groups.get(s.tier)!.push(s)
  }
  return [...groups.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([tier, items]) => ({ tier, label: labels[tier], items }))
})
</script>

<template>
  <div class="space-y-8">
    <header class="flex items-start justify-between gap-3">
      <div>
        <h1 class="text-2xl">Library</h1>
        <p class="mt-1 text-[var(--color-ink-soft)]">Every situation, organized by how essential it is. Jump in anywhere.</p>
      </div>
      <button
        class="shrink-0 text-sm text-[var(--color-ink-soft)] underline-offset-4 hover:underline"
        @click="router.push('/phrasebook')"
      >
        Phrasebook →
      </button>
    </header>

    <section v-for="group in tiers" :key="group.tier" class="space-y-3">
      <h2 class="text-sm font-medium uppercase tracking-wide text-[var(--color-muted)]">{{ group.label }}</h2>
      <ul class="space-y-2">
        <li v-for="s in group.items" :key="s.id">
          <button
            class="card flex w-full items-center justify-between p-4 text-left transition-shadow hover:shadow-sm"
            @click="router.push(`/scenario/${s.id}`)"
          >
            <div>
              <p class="font-medium">{{ s.title }}</p>
              <p class="text-sm text-[var(--color-ink-soft)]">{{ s.goal }}</p>
            </div>
            <span
              v-if="progress.isCompleted(s.id)"
              class="ml-3 flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-sage)] text-white"
              title="Completed"
            >
              <Check class="size-4" />
            </span>
            <span v-else class="ml-3 pill shrink-0">{{ s.cefr }}</span>
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>
