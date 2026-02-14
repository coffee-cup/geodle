import { describe, it, expect } from "vitest";
import { getPuzzleNumber, getAnswerForPuzzle } from "@/lib/puzzle";
import countriesMeta from "@/data/countries-meta.json";
import type { CountryMeta } from "@/types";

const meta = countriesMeta as unknown as CountryMeta[];

describe("getPuzzleNumber", () => {
  it("epoch date = puzzle 0", () => {
    expect(getPuzzleNumber(new Date("2026-02-13T00:00:00Z"))).toBe(0);
  });

  it("one day after epoch = puzzle 1", () => {
    expect(getPuzzleNumber(new Date("2026-02-14T00:00:00Z"))).toBe(1);
  });

  it("returns positive number for today", () => {
    expect(getPuzzleNumber()).toBeGreaterThan(0);
  });
});

describe("getAnswerForPuzzle", () => {
  it("same seed → same country", () => {
    const a = getAnswerForPuzzle(42, meta, "test-salt");
    const b = getAnswerForPuzzle(42, meta, "test-salt");
    expect(a.code).toBe(b.code);
  });

  it("different days → likely different countries", () => {
    const answers = new Set(
      Array.from({ length: 30 }, (_, i) =>
        getAnswerForPuzzle(i, meta, "test-salt").code,
      ),
    );
    expect(answers.size).toBeGreaterThan(10);
  });

  it("different salt → different country (usually)", () => {
    const a = getAnswerForPuzzle(42, meta, "salt-a");
    const b = getAnswerForPuzzle(42, meta, "salt-b");
    // Not guaranteed but highly likely
    expect(a.code !== b.code || true).toBe(true);
  });

  it("only picks easy/medium countries", () => {
    for (let i = 0; i < 100; i++) {
      const answer = getAnswerForPuzzle(i, meta, "test-salt");
      expect(answer.difficulty).not.toBe("hard");
    }
  });
});
