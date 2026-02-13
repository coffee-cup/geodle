import seedrandom from "seedrandom";
import type { CountryMeta } from "@/types";

const EPOCH = new Date("2025-01-01T00:00:00Z").getTime();
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

/** Fisher-Yates shuffle with seeded RNG. Filters out hard countries. */
export function getShuffledCountries(
  seed: string,
  countries: CountryMeta[],
): CountryMeta[] {
  const eligible = countries.filter((c) => c.difficulty !== "hard");
  const shuffled = [...eligible];
  const rng = seedrandom(seed);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
