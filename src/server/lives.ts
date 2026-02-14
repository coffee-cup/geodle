import { createServerFn } from "@tanstack/react-start";
import { getShuffledCountries } from "@/lib/puzzle";
import { evaluateGuess } from "@/lib/evaluate-guess";
import { getSvgByCode } from "@/server/silhouette";
import countriesMetaJson from "@/data/countries-meta.json";
import type { CountryMeta, Difficulty, SilhouetteData, LivesSessionData, LivesGuessResponse } from "@/types";

const countriesMeta = countriesMetaJson as unknown as CountryMeta[];

function getSilhouette(code: string): SilhouetteData {
  return { svg: getSvgByCode(code) };
}

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export const startLivesSession = createServerFn({ method: "GET" })
  .inputValidator((data: { difficulty?: string }) => data)
  .handler(async ({ data }): Promise<LivesSessionData> => {
    const difficulty: Difficulty = DIFFICULTIES.includes(data.difficulty as Difficulty)
      ? (data.difficulty as Difficulty)
      : "medium";
    const seed = crypto.randomUUID();
    const shuffled = getShuffledCountries(seed, countriesMeta, difficulty);
    return {
      seed,
      silhouette: getSilhouette(shuffled[0].code),
      round: 0,
      difficulty,
    };
  });

export const submitLivesGuess = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { seed: string; round: number; code: string; guess_number: number; difficulty: Difficulty }) => data,
  )
  .handler(async ({ data }): Promise<LivesGuessResponse> => {
    const { seed, round, code, guess_number, difficulty } = data;

    if (guess_number < 1 || guess_number > 3) {
      throw new Error("Invalid guess number");
    }

    const shuffled = getShuffledCountries(seed, countriesMeta, difficulty);
    const answer = shuffled[round];
    if (!answer) throw new Error("Invalid round");

    const result = evaluateGuess(code, answer, countriesMeta);
    const round_over = result.correct || guess_number >= 3;

    const nextRound = round + 1;
    const hasNext = round_over && nextRound < shuffled.length;

    return {
      ...result,
      ...(round_over && { answer_code: answer.code, answer_name: answer.name }),
      round_over,
      ...(hasNext && {
        next_silhouette: getSilhouette(shuffled[nextRound].code),
        next_round: nextRound,
      }),
    };
  });
