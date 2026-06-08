<script setup lang="ts">
import type { ContrastItem, TrainerVerb } from '@/content/trainer'
import type { Person, Tense } from '@/lib/conjugate'
import { Check, X } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { contrastItems, tenseGuides, trainerVerbs } from '@/content/trainer'
import { conjugate, PRONOUNS } from '@/lib/conjugate'
import { normalize, speak, ttsSupported } from '@/lib/speech'
import { useSettings } from '@/stores/settings'

const settings = useSettings()
const supported = ttsSupported()

type Stage = Tense | 'contrast'
const stage = ref<Stage>('present')
const score = ref({ correct: 0, total: 0 })

function say(text: string) {
  if (supported)
    speak(text, settings.speechRate)
}

// --- typed conjugation drill (per tense) -----------------------------------
const verb = ref<TrainerVerb>(trainerVerbs[0])
const person = ref<Person>(0)
const input = ref('')
const checked = ref(false)
const correct = ref(false)

const answer = computed(() =>
  stage.value === 'contrast' ? '' : conjugate(verb.value.infinitive, stage.value, person.value),
)

function newDrill() {
  verb.value = trainerVerbs[Math.floor(Math.random() * trainerVerbs.length)]
  person.value = Math.floor(Math.random() * 5) as Person
  input.value = ''
  checked.value = false
  correct.value = false
}

function check() {
  if (checked.value) {
    newDrill()
    return
  }
  correct.value = normalize(input.value) === normalize(answer.value) && input.value.trim() !== ''
  checked.value = true
  score.value.total += 1
  if (correct.value)
    score.value.correct += 1
  say(answer.value)
}

function reveal() {
  if (checked.value)
    return
  checked.value = true
  correct.value = false
  score.value.total += 1
  say(answer.value)
}

// --- preterite vs imperfect chooser ----------------------------------------
const cItem = ref<ContrastItem>(contrastItems[0])
const cChosen = ref<string | null>(null)

function newContrast() {
  cItem.value = contrastItems[Math.floor(Math.random() * contrastItems.length)]
  cChosen.value = null
}

function choose(opt: string) {
  if (cChosen.value)
    return
  cChosen.value = opt
  score.value.total += 1
  if (opt === cItem.value.answer)
    score.value.correct += 1
  say(cItem.value.sentence.replace('___', cItem.value.answer))
}

// Reset when switching stages.
watch(stage, () => {
  score.value = { correct: 0, total: 0 }
  if (stage.value === 'contrast')
    newContrast()
  else
    newDrill()
}, { immediate: true })

const guide = computed(() => tenseGuides.find(g => g.id === stage.value))
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl">Tenses</h1>
      <p class="mt-1 max-w-prose text-[var(--color-ink-soft)]">
        The thing that trips most people up. Learn when each tense is used, then drill it until
        it's automatic.
      </p>
    </header>

    <!-- stage selector -->
    <div class="-mx-4 overflow-x-auto px-4">
      <div class="flex w-max gap-2">
        <button
          v-for="g in tenseGuides"
          :key="g.id"
          class="rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors"
          :class="stage === g.id
            ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
            : 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-2)]'"
          @click="stage = g.id"
        >
          {{ g.name }}
        </button>
        <button
          class="rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors"
          :class="stage === 'contrast'
            ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
            : 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:bg-[var(--color-paper-2)]'"
          @click="stage = 'contrast'"
        >
          Pret. vs Imp.
        </button>
      </div>
    </div>

    <!-- guidance -->
    <div v-if="guide" class="card border-l-4 border-l-[var(--color-ink)] p-4">
      <p class="text-sm font-medium">When to use it</p>
      <p class="mt-1 text-sm text-[var(--color-ink-soft)]">{{ guide.when }}</p>
      <p class="mt-2 text-sm">{{ guide.example }}</p>
    </div>
    <div v-else class="card border-l-4 border-l-[var(--color-ink)] p-4 text-sm text-[var(--color-ink-soft)]">
      Same verb, two past tenses. <strong>Preterite</strong> = a finished event ("what happened").
      <strong>Imperfect</strong> = background, habits, or "was —ing" ("what was going on"). Pick the
      one that fits.
    </div>

    <p class="text-right text-sm text-[var(--color-muted)]">Score: {{ score.correct }} / {{ score.total }}</p>

    <!-- TYPED DRILL -->
    <section v-if="stage !== 'contrast'" class="card p-6 text-center space-y-5">
      <p class="text-xs uppercase tracking-wide text-[var(--color-muted)]">Type the {{ guide?.name.toLowerCase() }} form</p>
      <p class="text-2xl">
        {{ verb.infinitive }}
        <span class="text-base text-[var(--color-muted)]">· {{ verb.en }}</span>
      </p>
      <p class="text-[var(--color-ink-soft)]">{{ PRONOUNS[person] }}</p>

      <input
        v-model="input"
        type="text"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        placeholder="conjugate…"
        class="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-4 py-3 text-center text-lg outline-none focus:border-[var(--color-ink)]"
        :class="checked ? (correct ? 'border-[var(--color-sage)]' : 'border-[var(--color-clay)]') : ''"
        :disabled="checked"
        @keyup.enter="check"
      >

      <div v-if="checked" class="space-y-1">
        <p v-if="correct" class="flex items-center justify-center gap-1.5 font-medium text-[var(--color-sage)]">
          <Check class="size-4" /> ¡Correcto!
        </p>
        <p v-else class="flex items-center justify-center gap-1.5 text-[var(--color-ink-soft)]">
          <X class="size-4 text-[var(--color-clay)]" /> Answer: <strong>{{ answer }}</strong>
        </p>
      </div>

      <div class="flex justify-center gap-2">
        <button v-if="!checked" class="btn btn-ghost" @click="reveal">Reveal</button>
        <button class="btn btn-primary" @click="check">{{ checked ? 'Next' : 'Check' }}</button>
      </div>
    </section>

    <!-- CONTRAST DRILL -->
    <section v-else class="card p-6 text-center space-y-5">
      <p class="text-xl">{{ cItem.sentence }}</p>
      <p class="text-sm text-[var(--color-ink-soft)]">{{ cItem.en }}</p>

      <div class="flex justify-center gap-3">
        <button
          v-for="opt in cItem.options"
          :key="opt"
          class="btn px-6 py-2.5"
          :class="!cChosen
            ? 'btn-ghost'
            : opt === cItem.answer
              ? 'btn-primary'
              : opt === cChosen ? 'border border-[var(--color-clay)] text-[var(--color-clay)]' : 'btn-ghost opacity-50'"
          :disabled="!!cChosen"
          @click="choose(opt)"
        >
          {{ opt }}
        </button>
      </div>

      <div v-if="cChosen" class="space-y-3">
        <p class="text-sm text-[var(--color-ink-soft)]">{{ cItem.why }}</p>
        <button class="btn btn-primary" @click="newContrast">Next</button>
      </div>
    </section>
  </div>
</template>
