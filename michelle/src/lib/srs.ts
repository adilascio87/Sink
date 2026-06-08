// FSRS-lite: a compact spaced-repetition scheduler. It keeps the core ideas of
// modern schedulers (per-card stability + difficulty, recall-driven intervals)
// while staying small enough to run entirely in the browser with no deps.

export type Rating = 'again' | 'hard' | 'good' | 'easy'
export type CardType = 'comprehension' | 'production' | 'listening'

export interface SrsCard {
  /** `${itemId}:${type}` — unique per item per practice direction. */
  key: string
  itemId: string
  type: CardType
  scenarioId: string
  /** Memory stability in days (higher = remembered longer). */
  stability: number
  /** Item difficulty, 1 (easy) .. 10 (hard). */
  difficulty: number
  /** Next due time, epoch ms. */
  due: number
  reps: number
  lapses: number
  /** Last review time, epoch ms (0 = never). */
  lastReview: number
}

const DAY = 86_400_000
const MIN_STABILITY = 0.5
const TARGET_RETENTION = 0.9

export function createCard(
  itemId: string,
  type: CardType,
  scenarioId: string,
  now = Date.now(),
): SrsCard {
  return {
    key: `${itemId}:${type}`,
    itemId,
    type,
    scenarioId,
    stability: 0,
    difficulty: 5,
    due: now,
    reps: 0,
    lapses: 0,
    lastReview: 0,
  }
}

function clampDifficulty(d: number): number {
  return Math.min(10, Math.max(1, d))
}

/** Interval (days) to hit the target retention given current stability. */
function intervalDays(stability: number): number {
  // Solve R = exp(-t/S) for the target retention.
  return Math.max(1, Math.round(stability * -Math.log(TARGET_RETENTION)))
}

/**
 * Apply a review rating and return the updated card. Pure function — the caller
 * persists the result.
 */
export function review(card: SrsCard, rating: Rating, now = Date.now()): SrsCard {
  const next: SrsCard = { ...card, reps: card.reps + 1, lastReview: now }

  // Difficulty drifts up on hard/again, down on easy.
  const difficultyDelta = { again: 1.2, hard: 0.4, good: -0.1, easy: -0.6 }[rating]
  next.difficulty = clampDifficulty(card.difficulty + difficultyDelta)

  if (card.stability === 0) {
    // First exposure: seed stability from the rating.
    next.stability = { again: MIN_STABILITY, hard: 1, good: 2.5, easy: 5 }[rating]
  }
  else if (rating === 'again') {
    // Lapse: shrink stability, scaled by difficulty.
    next.lapses = card.lapses + 1
    next.stability = Math.max(MIN_STABILITY, card.stability * (0.4 - card.difficulty * 0.02))
  }
  else {
    // Success: grow stability. Easier ratings and lower difficulty grow faster;
    // longer-remembered cards grow more slowly (diminishing returns).
    const ratingFactor = { hard: 1.15, good: 1.5, easy: 2.1 }[rating]
    const difficultyFactor = 1 + (10 - next.difficulty) * 0.04
    next.stability = card.stability * ratingFactor * difficultyFactor
  }

  const days = rating === 'again' ? 0 : intervalDays(next.stability)
  // A lapse comes back in ~10 minutes within the same session.
  next.due = rating === 'again' ? now + 10 * 60_000 : now + days * DAY
  return next
}

/** Cards that are due now, soonest first. */
export function dueCards(cards: SrsCard[], now = Date.now()): SrsCard[] {
  return cards.filter(c => c.due <= now).sort((a, b) => a.due - b.due)
}

/** Human-readable summary of when a card next falls due. */
export function describeDue(card: SrsCard, now = Date.now()): string {
  const diff = card.due - now
  if (diff <= 0)
    return 'due now'
  const days = Math.round(diff / DAY)
  if (days >= 1)
    return `in ${days} day${days === 1 ? '' : 's'}`
  const mins = Math.round(diff / 60_000)
  return `in ${mins} min`
}
