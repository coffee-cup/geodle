import { createServerFn } from "@tanstack/react-start";
import { getPuzzleNumber, getAnswerForPuzzle } from "@/lib/puzzle";
import { evaluateGuess } from "@/lib/evaluate-guess";
import countriesMetaJson from "@/data/countries-meta.json";
import type { CountryMeta, GuessResponse } from "@/types";

const SALT = process.env.PUZZLE_SALT ?? "geodle-default-salt";
const countriesMeta = countriesMetaJson as unknown as CountryMeta[];
const MAX_GUESSES = 6;

export const submitGuess = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { code: string; puzzle_number: number; guess_number: number }) =>
      data,
  )
  .handler(async ({ data }): Promise<GuessResponse> => {
    const { code, puzzle_number, guess_number } = data;

    const currentPuzzle = getPuzzleNumber();
    if (puzzle_number !== currentPuzzle) {
      throw new Error("Invalid puzzle number");
    }

    if (guess_number < 1 || guess_number > MAX_GUESSES) {
      throw new Error("Invalid guess number");
    }

    const answer = getAnswerForPuzzle(puzzle_number, countriesMeta, SALT);
    const result = evaluateGuess(code, answer, countriesMeta);

    const isReveal = result.correct || guess_number >= MAX_GUESSES;

    return {
      ...result,
      ...(isReveal && {
        answer_code: answer.code,
        answer_name: answer.name,
      }),
    };
  });
