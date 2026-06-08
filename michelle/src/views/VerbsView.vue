<script setup lang="ts">
import type { TenseId, Verb, VerbForm } from '@/content/verbs'
import { ref } from 'vue'
import SpeakButton from '@/components/SpeakButton.vue'
import { tenses, verbs } from '@/content/verbs'
import { speak, ttsSupported } from '@/lib/speech'
import { useSettings } from '@/stores/settings'

const settings = useSettings()
const supported = ttsSupported()

const tense = ref<TenseId>('present')

function say(text: string) {
  if (supported)
    speak(text, settings.speechRate)
}

// Active-recall quiz across every verb, tense, and form.
const quiz = ref(false)
const qVerb = ref<Verb>(verbs[0])
const qTense = ref<TenseId>('present')
const qForm = ref<VerbForm>(verbs[0].forms.present[0])
const qRevealed = ref(false)

function tenseName(id: TenseId) {
  return tenses.find(t => t.id === id)?.name ?? id
}

function newQuestion() {
  qVerb.value = verbs[Math.floor(Math.random() * verbs.length)]
  qTense.value = tenses[Math.floor(Math.random() * tenses.length)].id
  const forms = qVerb.value.forms[qTense.value]
  qForm.value = forms[Math.floor(Math.random() * forms.length)]
  qRevealed.value = false
}

function reveal() {
  qRevealed.value = true
  say(qForm.value.es)
}

function startQuiz() {
  quiz.value = true
  newQuestion()
}
</script>

<template>
  <div class="space-y-6">
    <header class="flex items-start justify-between gap-3">
      <div>
        <h1 class="text-2xl">Key verbs</h1>
        <p class="mt-1 max-w-prose text-[var(--color-ink-soft)]">
          The eight verbs that carry most conversation, across five tenses. Tap any form to hear it.
        </p>
      </div>
      <button class="btn btn-ghost shrink-0" @click="quiz ? (quiz = false) : startQuiz()">
        {{ quiz ? 'Back to list' : 'Quiz me' }}
      </button>
    </header>

    <!-- QUIZ -->
    <section v-if="quiz" class="card p-6 text-center space-y-5">
      <p class="text-xs uppercase tracking-wide text-[var(--color-muted)]">
        Say the {{ tenseName(qTense).toLowerCase() }} form
      </p>
      <p class="text-2xl">
        {{ qVerb.infinitive }}
        <span class="text-[var(--color-muted)]">— {{ qForm.label }}</span>
      </p>
      <p class="text-xs text-[var(--color-muted)]">{{ tenseName(qTense) }}</p>

      <button v-if="!qRevealed" class="btn btn-ghost w-full" @click="reveal">Reveal</button>
      <div v-else class="space-y-4">
        <div class="border-t border-[var(--color-line)] pt-4">
          <p class="text-2xl font-medium">{{ qForm.es }}</p>
        </div>
        <div class="flex justify-center gap-2">
          <button class="btn btn-ghost" @click="say(qForm.es)">Hear it</button>
          <button class="btn btn-primary" @click="newQuestion">Next</button>
        </div>
      </div>
    </section>

    <template v-else>
      <!-- tense selector -->
      <div class="-mx-4 overflow-x-auto px-4">
        <div class="flex w-max gap-2">
          <button
            v-for="t in tenses"
            :key="t.id"
            class="rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors"
            :class="t.id === tense
              ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
              : 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-2)]'"
            @click="tense = t.id"
          >
            {{ t.name }}
          </button>
        </div>
      </div>
      <p class="text-sm text-[var(--color-muted)]">{{ tenses.find(t => t.id === tense)?.note }}</p>

      <!-- conjugation list -->
      <section v-for="v in verbs" :key="v.id" class="card p-5 space-y-3">
        <h2 class="text-lg font-medium">
          {{ v.infinitive }}
          <span class="ml-1 text-sm font-normal text-[var(--color-muted)]">{{ v.en }}</span>
        </h2>

        <ul class="divide-y divide-[var(--color-line)]">
          <li v-for="form in v.forms[tense]" :key="form.label">
            <button
              class="flex w-full items-center justify-between gap-3 py-2 text-left hover:opacity-70"
              @click="say(form.es)"
            >
              <span class="text-sm text-[var(--color-muted)]">{{ form.label }}</span>
              <span class="font-medium">{{ form.es }}</span>
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
    </template>
  </div>
</template>
