<script setup lang="ts">
import { Volume2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { speak, ttsSupported } from '@/lib/speech'
import { useSettings } from '@/stores/settings'

const props = defineProps<{ text: string, slow?: boolean, label?: string }>()
const settings = useSettings()
const speaking = ref(false)
const supported = ttsSupported()

async function play() {
  if (!supported || speaking.value)
    return
  speaking.value = true
  await speak(props.text, props.slow ? settings.slowRate : settings.speechRate)
  speaking.value = false
}
</script>

<template>
  <button
    type="button"
    class="btn btn-ghost"
    :disabled="!supported"
    :title="supported ? 'Listen' : 'Audio not supported in this browser'"
    :aria-label="label ?? 'Listen'"
    :class="{ 'opacity-50': !supported, 'animate-pulse': speaking }"
    @click="play"
  >
    <Volume2 class="size-4" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>
