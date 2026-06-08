<script setup lang="ts">
import { Volume2 } from 'lucide-vue-next'
import { sounds } from '@/content/pronunciation'
import { speak, ttsSupported } from '@/lib/speech'
import { useSettings } from '@/stores/settings'

const settings = useSettings()
const supported = ttsSupported()

function say(text: string, slow = false) {
  if (supported)
    speak(text, slow ? settings.slowRate : settings.speechRate)
}
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl">Sounds</h1>
      <p class="mt-1 max-w-prose text-[var(--color-ink-soft)]">
        The handful of sounds that decide whether your family understands you. Tap to hear,
        then <em>say it back</em>.
      </p>
    </header>

    <section v-for="s in sounds" :key="s.id" class="card p-5 space-y-3">
      <div class="flex items-baseline gap-3">
        <span class="font-[family-name:var(--font-display)] text-xl text-[var(--color-ink)]">{{ s.symbol }}</span>
        <h2 class="text-base font-medium">{{ s.title }}</h2>
      </div>
      <p class="text-sm text-[var(--color-ink-soft)]">{{ s.tip }}</p>

      <div class="flex flex-wrap gap-2 pt-1">
        <button
          v-for="ex in s.examples"
          :key="ex.es"
          class="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-sm hover:bg-[var(--color-paper-2)]"
          :title="ex.en"
          @click="say(ex.es)"
        >
          {{ ex.es }}
          <span class="ml-1 text-[var(--color-muted)]">· {{ ex.en }}</span>
        </button>
      </div>

      <div v-if="s.pairs?.length" class="space-y-2 border-t border-[var(--color-line)] pt-3">
        <p class="text-xs uppercase tracking-wide text-[var(--color-muted)]">Hear the difference</p>
        <div v-for="p in s.pairs" :key="p.a + p.b" class="flex items-center gap-2 text-sm">
          <button class="btn btn-ghost px-3 py-1.5" @click="say(p.a, true)">
            <Volume2 class="size-3.5" /> {{ p.a }}
          </button>
          <span class="text-[var(--color-muted)]">vs</span>
          <button class="btn btn-ghost px-3 py-1.5" @click="say(p.b, true)">
            <Volume2 class="size-3.5" /> {{ p.b }}
          </button>
          <span class="text-[var(--color-ink-soft)]">— {{ p.note }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
