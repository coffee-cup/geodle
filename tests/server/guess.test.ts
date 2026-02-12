import { describe, it, expect } from "vitest";
import { getAnswerForPuzzle } from "@/lib/puzzle";
import { haversine, bearing, compassDirection } from "@/lib/geo";
import countriesMeta from "@/data/countries-meta.json";
import type { CountryMeta } from "@/types";

/**
 * These tests verify the guess logic directly rather than through the server fn,
 * since createServerFn requires the TanStack Start runtime.
 */
const SALT = "test-salt";
const meta = countriesMeta as unknown as CountryMeta[];

function simulateGuess(code: string, puzzleNumber: number) {
  const answer = getAnswerForPuzzle(puzzleNumber, meta, SALT);
  const guessed = meta.find((c) => c.code === code);
  if (!guessed) throw new Error("Invalid country code");

  const correct = code === answer.code;
  const distance_km = Math.round(
    haversine(guessed.centroid, answer.centroid),
  );
  const bear = bearing(guessed.centroid, answer.centroid);
  const direction = correct ? "📍" : compassDirection(bear);

  return {
    correct,
    distance_km,
    direction,
    bearing: Math.round(bear),
    answer_code: answer.code,
  };
}

describe("guess logic", () => {
  const puzzleNumber = 42;
  const answer = getAnswerForPuzzle(puzzleNumber, meta, SALT);

  it("correct guess returns distance 0", () => {
    const result = simulateGuess(answer.code, puzzleNumber);
    expect(result.correct).toBe(true);
    expect(result.distance_km).toBe(0);
  });

  it("wrong guess returns plausible distance", () => {
    const wrongCode = meta.find((c) => c.code !== answer.code)!.code;
    const result = simulateGuess(wrongCode, puzzleNumber);
    expect(result.correct).toBe(false);
    expect(result.distance_km).toBeGreaterThan(0);
    expect(result.distance_km).toBeLessThan(25000);
  });

  it("wrong guess has a compass direction", () => {
    const wrongCode = meta.find((c) => c.code !== answer.code)!.code;
    const result = simulateGuess(wrongCode, puzzleNumber);
    expect(["N", "NE", "E", "SE", "S", "SW", "W", "NW"]).toContain(
      result.direction,
    );
  });

  it("invalid code throws", () => {
    expect(() => simulateGuess("ZZZZ", puzzleNumber)).toThrow();
  });
});
