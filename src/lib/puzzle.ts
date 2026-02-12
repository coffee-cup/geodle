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
