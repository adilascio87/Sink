<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import SpeakButton from '@/components/SpeakButton.vue'
import { scenarios } from '@/content/index'

const query = ref('')

const total = computed(() => scenarios.reduce((n, s) => n + s.chunks.length, 0))

const groups = computed(() => {
  const q = query.value.trim().toLowerCase()
  return scenarios
    .map(s => ({
      title: s.title,
      items: s.chunks.filter(
        c => !q || c.es.toLowerCase().includes(q) || c.en.toLowerCase().includes(q),
      ),
    }))
    .filter(g => g.items.length > 0)
})
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl">Phrasebook</h1>
      <p class="mt-1 text-[var(--color-ink-soft)]">
        Every key phrase in one place ({{ total }}). Tap to hear it — handy for a quick refresh.
      </p>
    </header>

    <div class="relative">
      <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted)]" />
      <input
        v-model="query"
        type="search"
        placeholder="Search in Spanish or English…"
        class="w-full rounded-full border border-[var(--color-line)] bg-[var(--color-card)] py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[var(--color-ink)]"
      >
    </div>

    <p v-if="groups.length === 0" class="card p-6 text-center text-[var(--color-ink-soft)]">
      No phrases match “{{ query }}”.
    </p>

    <section v-for="group in groups" :key="group.title" class="space-y-2">
      <h2 class="text-sm font-medium uppercase tracking-wide text-[var(--color-muted)]">{{ group.title }}</h2>
      <ul class="card divide-y divide-[var(--color-line)] p-0">
        <li v-for="c in group.items" :key="c.id" class="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <p class="font-medium">{{ c.es }}</p>
            <p class="text-sm text-[var(--color-ink-soft)]">{{ c.en }}</p>
          </div>
          <SpeakButton :text="c.es" />
        </li>
      </ul>
    </section>
  </div>
</template>
