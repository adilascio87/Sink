<script setup lang="ts">
import { ArrowRight, Check } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getScenario } from '@/content/index'
import { plan } from '@/content/path'
import { useProgress } from '@/stores/progress'

const router = useRouter()
const progress = useProgress()

const days = computed(() =>
  plan.map(d => ({
    ...d,
    scenarioItems: d.scenarios
      .map(id => getScenario(id))
      .filter((s): s is NonNullable<typeof s> => !!s),
    done: d.scenarios.length > 0 && d.scenarios.every(id => progress.isCompleted(id)),
  })),
)
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl">Your first week</h1>
      <p class="mt-1 max-w-prose text-[var(--color-ink-soft)]">
        A short, opinionated path from your first "hola" to holding a real conversation with
        family. Go at your own pace — one day per sitting is plenty.
      </p>
    </header>

    <ol class="space-y-3">
      <li v-for="d in days" :key="d.day" class="card p-5">
        <div class="flex items-start gap-4">
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
            :class="d.done
              ? 'bg-[var(--color-sage)] text-white'
              : 'bg-[var(--color-paper-2)] text-[var(--color-ink-soft)]'"
          >
            <Check v-if="d.done" class="size-4" />
            <span v-else>{{ d.day }}</span>
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-medium">{{ d.title }}</p>
            <p class="text-sm text-[var(--color-ink-soft)]">{{ d.focus }}</p>

            <div class="mt-3 flex flex-wrap gap-2">
              <button
                v-for="s in d.scenarioItems"
                :key="s.id"
                class="btn btn-ghost px-3 py-1.5 text-xs"
                :class="progress.isCompleted(s.id) ? 'border-[var(--color-sage)]' : ''"
                @click="router.push(`/scenario/${s.id}`)"
              >
                <Check v-if="progress.isCompleted(s.id)" class="size-3.5" />
                {{ s.title }}
              </button>
              <button
                v-for="t in d.tools"
                :key="t.to"
                class="btn btn-ghost px-3 py-1.5 text-xs"
                @click="router.push(t.to)"
              >
                {{ t.label }}
                <ArrowRight class="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>
