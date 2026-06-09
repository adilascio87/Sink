<script setup lang="ts">
import type { RoleplayStep } from '@/content/types'
import { ArrowRight, Check, Eye, EyeOff, Lightbulb, X } from 'lucide-vue-next'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SpeakButton from '@/components/SpeakButton.vue'
import { getScenario, studyItems } from '@/content/index'
import { useProgress } from '@/stores/progress'
import { useSettings } from '@/stores/settings'
import { useSrs } from '@/stores/srs'

type Phase = 'intro' | 'input' | 'roleplay' | 'listening' | 'done'

const route = useRoute()
const router = useRouter()
const srs = useSrs()
const progress = useProgress()
const settings = useSettings()

const scenario = computed(() => getScenario(String(route.params.id)))
const phase = ref<Phase>('intro')

const lineById = (id: string) => scenario.value?.dialogue.find(l => l.id === id)
const shadowLines = computed(() =>
  (scenario.value?.shadowing ?? []).map(lineById).filter((l): l is NonNullable<typeof l> => !!l),
)

// --- phase navigation -------------------------------------------------------
function toInput() {
  if (scenario.value)
    srs.enroll(studyItems(scenario.value))
  phase.value = 'input'
}

// --- roleplay (self-graded, no microphone) ---------------------------------
const rpIndex = ref(0)
const rp = reactive({ revealed: false })
const currentStep = computed<RoleplayStep | undefined>(() => scenario.value?.roleplay[rpIndex.value])

// Self-grade: record an honest one-tap rating and move straight on.
function selfGrade(got: boolean) {
  progress.recordSpeaking(got ? 1 : 0.4)
  nextRoleplay()
}

function nextRoleplay() {
  if (!scenario.value)
    return
  if (rpIndex.value < scenario.value.roleplay.length - 1) {
    rpIndex.value += 1
    rp.revealed = false
  }
  else {
    phase.value = 'listening'
  }
}

// --- completion -------------------------------------------------------------
function finish() {
  if (scenario.value)
    progress.completeScenario(scenario.value.id)
  phase.value = 'done'
}
</script>

<template>
  <div v-if="!scenario" class="card p-6 text-center">
    <p>Scenario not found.</p>
    <button class="btn btn-ghost mt-4" @click="router.push('/library')">Back to library</button>
  </div>

  <div v-else class="space-y-6">
    <!-- progress rail -->
    <div class="flex items-center justify-between gap-2 text-xs text-[var(--color-muted)]">
      <div class="flex items-center gap-2">
        <span :class="phase === 'intro' ? 'text-[var(--color-clay)] font-medium' : ''">Intro</span>
        <span>·</span>
        <span :class="phase === 'input' ? 'text-[var(--color-clay)] font-medium' : ''">Learn</span>
        <span>·</span>
        <span :class="phase === 'roleplay' ? 'text-[var(--color-clay)] font-medium' : ''">Speak</span>
        <span>·</span>
        <span :class="phase === 'listening' ? 'text-[var(--color-clay)] font-medium' : ''">Listen</span>
      </div>
      <button
        class="flex items-center gap-1 rounded-full border border-[var(--color-line)] px-2.5 py-1 hover:bg-[var(--color-paper-2)]"
        :title="settings.showEnglish ? 'Hide English (challenge mode)' : 'Show English'"
        @click="settings.showEnglish = !settings.showEnglish"
      >
        <component :is="settings.showEnglish ? Eye : EyeOff" class="size-3.5" />
        {{ settings.showEnglish ? 'EN on' : 'ES only' }}
      </button>
    </div>

    <!-- INTRO -->
    <section v-if="phase === 'intro'" class="space-y-4">
      <div class="flex items-center gap-2">
        <span class="pill">Tier {{ scenario.tier }}</span>
        <span class="pill">{{ scenario.cefr }}</span>
      </div>
      <h1 class="text-2xl">{{ scenario.title }}</h1>
      <p class="text-[var(--color-ink-soft)]">{{ scenario.goal }}</p>
      <div v-if="scenario.culture" class="card border-l-4 border-l-[var(--color-clay)] p-4">
        <p class="text-sm font-medium text-[var(--color-clay)]">Ecuador note</p>
        <p class="mt-1 text-sm text-[var(--color-ink-soft)]">{{ scenario.culture }}</p>
      </div>
      <button class="btn btn-primary" @click="toInput">Begin <ArrowRight class="size-4" /></button>
    </section>

    <!-- INPUT: dialogue + chunks + vocab -->
    <section v-else-if="phase === 'input'" class="space-y-6">
      <div>
        <h2 class="text-xl">The conversation</h2>
        <p class="text-sm text-[var(--color-ink-soft)]">Listen first, then read. Tap any line to hear it.</p>
      </div>

      <ul class="space-y-3">
        <li
          v-for="line in scenario.dialogue"
          :key="line.id"
          class="card p-4"
          :class="line.speaker === 'you' ? 'border-l-4 border-l-[var(--color-sage)]' : ''"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-[10px] uppercase tracking-wide text-[var(--color-muted)]">
                {{ line.speaker === 'you' ? 'You' : 'Them' }}
              </p>
              <p class="mt-0.5 text-lg">{{ line.es }}</p>
              <p v-if="settings.showEnglish" class="text-sm text-[var(--color-ink-soft)]">{{ line.en }}</p>
              <p v-if="line.note" class="mt-1 text-xs italic text-[var(--color-muted)]">{{ line.note }}</p>
            </div>
            <SpeakButton :text="line.es" />
          </div>
        </li>
      </ul>

      <div class="card p-4">
        <h3 class="text-sm font-medium uppercase tracking-wide text-[var(--color-muted)]">Key phrases</h3>
        <ul class="mt-2 divide-y divide-[var(--color-line)]">
          <li v-for="c in scenario.chunks" :key="c.id" class="flex items-center justify-between gap-3 py-2">
            <div>
              <p class="font-medium">{{ c.es }}</p>
              <p class="text-sm text-[var(--color-ink-soft)]">{{ c.en }}</p>
              <p v-if="c.literal" class="text-xs italic text-[var(--color-muted)]">lit. “{{ c.literal }}”</p>
            </div>
            <SpeakButton :text="c.es" />
          </li>
        </ul>
      </div>

      <div v-if="scenario.grammarNote" class="card bg-[var(--color-paper-2)] p-4">
        <p class="text-sm font-medium">Just-in-time grammar</p>
        <p class="mt-1 text-sm text-[var(--color-ink-soft)]">{{ scenario.grammarNote }}</p>
      </div>

      <button class="btn btn-primary" @click="phase = 'roleplay'">
        Now you try <ArrowRight class="size-4" />
      </button>
    </section>

    <!-- ROLEPLAY -->
    <section v-else-if="phase === 'roleplay'" class="space-y-5">
      <div>
        <h2 class="text-xl">Your turn to speak</h2>
        <p class="text-sm text-[var(--color-ink-soft)]">
          Step {{ rpIndex + 1 }} of {{ scenario.roleplay.length }} — respond out loud.
        </p>
      </div>

      <div v-if="currentStep" class="card p-5 space-y-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-[10px] uppercase tracking-wide text-[var(--color-muted)]">They say</p>
            <p class="mt-0.5 text-lg">{{ currentStep.prompt }}</p>
            <p v-if="settings.showEnglish" class="text-sm text-[var(--color-ink-soft)]">{{ currentStep.promptEn }}</p>
          </div>
          <SpeakButton :text="currentStep.prompt" />
        </div>

        <div class="border-t border-[var(--color-line)] pt-4">
          <!-- say it aloud, reveal, one-tap self-grade (no microphone) -->
          <button v-if="!rp.revealed" class="btn btn-primary w-full" @click="rp.revealed = true">
            Say it aloud, then show the answer
          </button>
          <div v-else class="space-y-3">
            <p class="text-center text-lg font-medium">{{ currentStep.accept[0] }}</p>
            <div class="flex justify-center">
              <SpeakButton :text="currentStep.accept[0]" label="Hear it" />
            </div>
            <div class="flex gap-2">
              <button class="btn btn-ghost flex-1" @click="selfGrade(false)">
                <X class="size-4" /> Tricky
              </button>
              <button class="btn btn-primary flex-1" @click="selfGrade(true)">
                <Check class="size-4" /> Got it
              </button>
            </div>
          </div>

          <!-- hint -->
          <p class="mt-3 flex items-center justify-center gap-1.5 text-xs text-[var(--color-muted)]">
            <Lightbulb class="size-3.5" /> {{ currentStep.hint }}
          </p>
        </div>
      </div>
    </section>

    <!-- LISTENING GYM -->
    <section v-else-if="phase === 'listening'" class="space-y-5">
      <div>
        <h2 class="text-xl">Listening gym</h2>
        <p class="text-sm text-[var(--color-ink-soft)]">
          Hear it at natural speed, then slowed. Repeat each line out loud (shadowing).
        </p>
      </div>
      <ul class="space-y-3">
        <li v-for="line in shadowLines" :key="line.id" class="card p-4">
          <p class="text-lg">{{ line.es }}</p>
          <p v-if="settings.showEnglish" class="text-sm text-[var(--color-ink-soft)]">{{ line.en }}</p>
          <div class="mt-3 flex gap-2">
            <SpeakButton :text="line.es" label="Natural" />
            <SpeakButton :text="line.es" :slow="true" label="Slow" />
          </div>
        </li>
      </ul>
      <button class="btn btn-primary" @click="finish">Finish session <Check class="size-4" /></button>
    </section>

    <!-- DONE -->
    <section v-else class="card p-6 text-center space-y-4">
      <div class="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-sage)] text-white">
        <Check class="size-7" />
      </div>
      <h2 class="text-xl">Session complete</h2>
      <p class="text-[var(--color-ink-soft)]">
        “{{ scenario.title }}” is now in your review rotation. Ready to run the whole thing end to end?
      </p>
      <button class="btn btn-primary" @click="router.push(`/converse/${scenario.id}`)">
        Practice the whole conversation <ArrowRight class="size-4" />
      </button>
      <div class="flex justify-center gap-2">
        <button class="btn btn-ghost" @click="router.push('/library')">Library</button>
        <button class="btn btn-ghost" @click="router.push('/')">Home</button>
      </div>
    </section>
  </div>
</template>
