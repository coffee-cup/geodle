import { describe, it, expect } from "vitest";
import { buildShareText } from "@/components/ShareGrid";
import type { GuessResult } from "@/types";

function makeGuess(distance_km: number, correct = false): GuessResult {
  return {
    code: "TST",
    name: "Test",
    correct,
    distance_km,
    direction: "N",
    bearing: 0,
  };
}

describe("buildShareText", () => {
  it("correct first guess", () => {
    const text = buildShareText([makeGuess(0, true)], 42, true);
    expect(text).toBe("Geodle #42 1/6\n🟩");
  });

  it("loss after 6 guesses", () => {
    const guesses = [
      makeGuess(15000),
      makeGuess(8000),
      makeGuess(5000),
      makeGuess(2000),
      makeGuess(1000),
      makeGuess(300),
    ];
    const text = buildShareText(guesses, 42, false);
    expect(text).toContain("X/6");
    expect(text).toContain("⬛");
  });

  it("distance thresholds produce correct emojis", () => {
    const guesses = [
      makeGuess(400),   // ≤500 → 🟩
      makeGuess(1400),  // ≤1500 → 🟨
      makeGuess(2900),  // ≤3000 → 🟧
      makeGuess(5900),  // ≤6000 → 🟥
      makeGuess(13000), // >12000 → ⬛
      makeGuess(0, true),
    ];
    const text = buildShareText(guesses, 1, true);
    expect(text).toContain("🟩🟨🟧🟥⬛🟩");
  });
});
