<script setup lang="ts">
import SpeakButton from '@/components/SpeakButton.vue'
import { verbs } from '@/content/verbs'
import { speak, ttsSupported } from '@/lib/speech'
import { useSettings } from '@/stores/settings'

const settings = useSettings()
const supported = ttsSupported()

function say(text: string) {
  if (supported)
    speak(text, settings.speechRate)
}
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl">Key verbs</h1>
      <p class="mt-1 max-w-prose text-[var(--color-ink-soft)]">
        Learn these eight cold and you can say most of what daily conversation needs. Tap any
        form to hear it.
      </p>
    </header>

    <section v-for="v in verbs" :key="v.id" class="card p-5 space-y-3">
      <div class="flex items-baseline justify-between gap-3">
        <h2 class="text-lg font-medium">
          {{ v.infinitive }}
          <span class="ml-1 text-sm font-normal text-[var(--color-muted)]">{{ v.en }}</span>
        </h2>
      </div>

      <ul class="divide-y divide-[var(--color-line)]">
        <li v-for="f in v.forms" :key="f.label">
          <button
            class="flex w-full items-center justify-between gap-3 py-2 text-left hover:opacity-70"
            @click="say(f.es)"
          >
            <span class="text-sm text-[var(--color-muted)]">{{ f.label }}</span>
            <span class="font-medium">{{ f.es }}</span>
          </button>
        </li>
      </ul>

      <p v-if="v.note" class="text-sm text-[var(--color-ink-soft)]">{{ v.note }}</p>

      <div class="flex items-center justify-between gap-3 border-t border-[var(--color-line)] pt-3">
        <div>
          <p class="font-medium">{{ v.example.es }}</p>
          <p v-if="settings.showEnglish" class="text-sm text-[var(--color-ink-soft)]">{{ v.example.en }}</p>
        </div>
        <SpeakButton :text="v.example.es" />
      </div>
    </section>
  </div>
</template>
