import type { Flashcard, ReviewRating } from '../types';

/**
 * SM-2 Spaced Repetition Algorithm implementation for Antigravity engine
 * Formula: EF' = max(1.3, EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
 * Where q is the review rating:
 *   0: Repetir (failed retrieval)
 *   3: Difícil (hard recall)
 *   4: Bien (good recall)
 *   5: Fácil (easy instant recall)
 */
export function calculateSM2(
  card: Flashcard,
  q: ReviewRating
): {
  newEaseFactor: number;
  newInterval: number;
  newRepetitions: number;
  nextDueDate: string;
} {
  const { easeFactor, interval, repetitions } = card;

  // Calculate new Ease Factor (EF)
  const newEaseFactor = Math.max(
    1.3,
    Number((easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))).toFixed(2))
  );

  let newInterval: number;
  let newRepetitions: number;

  if (q < 3) {
    // If failed (Repetir), restart the repetition ladder
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Successful recall
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEaseFactor);
      if (q === 5) {
        // Bonus for easy recall
        newInterval = Math.round(newInterval * 1.3);
      }
    }
    newRepetitions = repetitions + 1;
  }

  // Calculate next due date
  const now = new Date();
  now.setDate(now.getDate() + newInterval);
  const nextDueDate = now.toISOString().split('T')[0];

  return {
    newEaseFactor,
    newInterval,
    newRepetitions,
    nextDueDate,
  };
}

/**
 * Net active time calculation (Antigravity Processing Engine)
 * T_neto = (end - start) - sum(pause_end - pause_start)
 */
export function calculateNetActiveTimeMs(
  startTimestamp: number,
  endTimestamp: number,
  pauseIntervals: Array<{ start: number; end: number }>
): number {
  const grossDuration = Math.max(0, endTimestamp - startTimestamp);
  const pauseDuration = pauseIntervals.reduce((acc, curr) => {
    return acc + Math.max(0, curr.end - curr.start);
  }, 0);
  return Math.max(0, grossDuration - pauseDuration);
}

/**
 * Coin conversion rule:
 * 1 minute of active study = 1 Virtual Coin
 */
export function calculateCoinsEarned(netMinutes: number): number {
  return Math.floor(netMinutes);
}
