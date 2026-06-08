<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useSrs } from '@/stores/srs'

const srs = useSrs()
const route = useRoute()

const nav = [
  { to: '/', label: 'Today' },
  { to: '/library', label: 'Library' },
  { to: '/builder', label: 'Build' },
  { to: '/review', label: 'Review' },
  { to: '/progress', label: 'Progress' },
]

const isActive = (to: string) =>
  to === '/' ? route.path === '/' : route.path.startsWith(to)

const dueCount = computed(() => srs.dueCount)
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <header class="sticky top-0 z-10 border-b border-[var(--color-line)] bg-[var(--color-paper)]/85 backdrop-blur">
      <div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <RouterLink to="/" class="flex items-baseline gap-2">
          <span class="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">Michelle</span>
          <span class="hidden text-xs text-[var(--color-muted)] sm:inline">conversational Spanish</span>
        </RouterLink>
        <RouterLink to="/settings" class="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
          Settings
        </RouterLink>
      </div>
    </header>

    <main class="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <nav class="sticky bottom-0 border-t border-[var(--color-line)] bg-[var(--color-paper)]/90 backdrop-blur">
      <div class="mx-auto flex max-w-3xl items-stretch justify-around">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="relative flex-1 py-3 text-center text-sm transition-colors"
          :class="isActive(item.to) ? 'text-[var(--color-clay)] font-medium' : 'text-[var(--color-ink-soft)]'"
        >
          {{ item.label }}
          <span
            v-if="item.to === '/review' && dueCount > 0"
            class="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--color-clay)] px-1.5 text-[11px] font-semibold text-white"
          >{{ dueCount }}</span>
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
