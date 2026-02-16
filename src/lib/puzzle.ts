import seedrandom from "seedrandom";
import type { CountryMeta, Difficulty } from "@/types";

/** Hour (UTC) when the daily puzzle resets — 15:00 UTC = 10am EST */
export const RESET_HOUR_UTC = 15;

const EPOCH = new Date(`2026-02-13T${String(RESET_HOUR_UTC).padStart(2, "0")}:00:00Z`).getTime();
const DAY_MS = 86400000;

export function getPuzzleNumber(date: Date = new Date()): number {
  return Math.floor((date.getTime() - EPOCH) / DAY_MS);
}

export function getAnswerForPuzzle(
  puzzleNumber: number,
  countries: CountryMeta[],
  salt: string,
): CountryMeta {
  const eligible = countries.filter((c) => c.difficulty !== "hard");
  const rng = seedrandom(salt + puzzleNumber);
  const index = Math.floor(rng() * eligible.length);
  return eligible[index];
}

/** Fisher-Yates shuffle with seeded RNG, filtered by difficulty ceiling. */
export function getShuffledCountries(
  seed: string,
  countries: CountryMeta[],
  difficulty: Difficulty = "medium",
): CountryMeta[] {
  const eligible =
    difficulty === "easy"
      ? countries.filter((c) => c.difficulty === "easy")
      : difficulty === "medium"
        ? countries.filter((c) => c.difficulty !== "hard")
        : countries;
  const shuffled = [...eligible];
  const rng = seedrandom(seed);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
