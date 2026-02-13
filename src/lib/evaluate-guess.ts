import { haversine, bearing, compassDirection } from "@/lib/geo";
import type { CountryMeta } from "@/types";

interface EvaluateGuessResult {
  correct: boolean;
  distance_km: number;
  direction: string;
  bearing: number;
  guess_name: string;
}

export function evaluateGuess(
  guessedCode: string,
  answer: CountryMeta,
  countriesMeta: CountryMeta[],
): EvaluateGuessResult {
  const guessed = countriesMeta.find((c) => c.code === guessedCode);
  if (!guessed) throw new Error("Invalid country code");

  const correct = guessedCode === answer.code;
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
    guess_name: guessed.name,
  };
}
