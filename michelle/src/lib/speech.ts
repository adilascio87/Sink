// A thin wrapper over the browser's Web Speech API. Text-to-speech drives the
// listening gym and dialogue playback; speech recognition powers spoken
// production practice. Everything runs on-device — no audio leaves the browser,
// no API keys, no network. Degrades gracefully when a capability is missing.

const PREFERRED_LANGS = ['es-EC', 'es-419', 'es-US', 'es-MX', 'es-CO', 'es-ES', 'es']

export function ttsSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  for (const lang of PREFERRED_LANGS) {
    const exact = voices.find(v => v.lang.toLowerCase() === lang.toLowerCase())
    if (exact)
      return exact
    const partial = voices.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase()))
    if (partial)
      return partial
  }
  return voices.find(v => v.lang.toLowerCase().startsWith('es'))
}

/** Speak Spanish text. `rate` 1 = native, lower = slowed for shadowing. */
export function speak(text: string, rate = 1): Promise<void> {
  return new Promise((resolve) => {
    if (!ttsSupported()) {
      resolve()
      return
    }
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    const voice = pickVoice()
    if (voice)
      utter.voice = voice
    utter.lang = voice?.lang ?? 'es-EC'
    utter.rate = rate
    utter.onend = () => resolve()
    utter.onerror = () => resolve()
    window.speechSynthesis.speak(utter)
  })
}

export function stopSpeaking(): void {
  if (ttsSupported())
    window.speechSynthesis.cancel()
}

// --- Speech recognition -----------------------------------------------------

type SpeechRecognitionCtor = new () => SpeechRecognitionLike
interface SpeechRecognitionLike {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  start: () => void
  stop: () => void
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}

function getRecognitionCtor(): SpeechRecognitionCtor | undefined {
  if (typeof window === 'undefined')
    return undefined
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition
}

export function recognitionSupported(): boolean {
  // Chrome/Edge block the mic on file:// pages (no secure origin for the
  // permission prompt), so recognition can't actually run there. Treat it as
  // unsupported so the UI falls back to self-grading instead of erroring.
  if (typeof window !== 'undefined' && window.location.protocol === 'file:')
    return false
  return getRecognitionCtor() !== undefined
}

/** Why recognition is unavailable, for clear messaging in the UI. */
export function recognitionStatus(): 'ok' | 'file' | 'unsupported' {
  if (typeof window !== 'undefined' && window.location.protocol === 'file:')
    return 'file'
  return getRecognitionCtor() ? 'ok' : 'unsupported'
}

/** Listen once and resolve with the recognized Spanish transcript. */
export function listenOnce(): Promise<string> {
  return new Promise((resolve, reject) => {
    const Ctor = getRecognitionCtor()
    if (!Ctor) {
      reject(new Error('unsupported'))
      return
    }
    const recog = new Ctor()
    recog.lang = 'es-EC'
    recog.interimResults = false
    recog.maxAlternatives = 1
    recog.continuous = false
    let settled = false
    recog.onresult = (event) => {
      settled = true
      resolve(event.results[0]?.[0]?.transcript ?? '')
    }
    recog.onerror = (event) => {
      settled = true
      reject(new Error(event.error))
    }
    recog.onend = () => {
      if (!settled)
        resolve('')
    }
    recog.start()
  })
}

// --- Answer scoring ---------------------------------------------------------

/** Strip accents, punctuation and case for forgiving comparison. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[¿?¡!.,;:]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (m === 0)
    return n
  if (n === 0)
    return m
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  let curr = new Array<number>(n + 1)
  for (let i = 1; i <= m; i++) {
    curr[0] = i
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost)
    }
    [prev, curr] = [curr, prev]
  }
  return prev[n]
}

/** Similarity 0..1 between a spoken attempt and the best accepted answer. */
export function scoreAnswer(attempt: string, accepted: string[]): number {
  const a = normalize(attempt)
  if (!a)
    return 0
  let best = 0
  for (const target of accepted) {
    const t = normalize(target)
    const maxLen = Math.max(a.length, t.length) || 1
    const sim = 1 - levenshtein(a, t) / maxLen
    if (sim > best)
      best = sim
  }
  return best
}
