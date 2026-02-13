import { createServerFn } from "@tanstack/react-start";
import { getShuffledCountries } from "@/lib/puzzle";
import { evaluateGuess } from "@/lib/evaluate-guess";
import countriesGeojson from "@/data/countries.geojson.json";
import countriesMetaJson from "@/data/countries-meta.json";
import type { CountryMeta, SilhouetteData, LivesSessionData, LivesGuessResponse } from "@/types";
import type { FeatureCollection, Geometry } from "geojson";

const countriesMeta = countriesMetaJson as unknown as CountryMeta[];
const geo = countriesGeojson as FeatureCollection<Geometry, { code: string }>;

function getSilhouette(code: string): SilhouetteData {
  const feature = geo.features.find((f) => f.properties.code === code);
  if (!feature) throw new Error("Country geometry not found");
  return { type: "Feature", geometry: feature.geometry, properties: {} };
}

export const startLivesSession = createServerFn({ method: "GET" }).handler(
  async (): Promise<LivesSessionData> => {
    const seed = crypto.randomUUID();
    const shuffled = getShuffledCountries(seed, countriesMeta);
    return {
      seed,
      silhouette: getSilhouette(shuffled[0].code),
      round: 0,
    };
  },
);

export const submitLivesGuess = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { seed: string; round: number; code: string; guess_number: number }) => data,
  )
  .handler(async ({ data }): Promise<LivesGuessResponse> => {
    const { seed, round, code, guess_number } = data;

    if (guess_number < 1 || guess_number > 3) {
      throw new Error("Invalid guess number");
    }

    const shuffled = getShuffledCountries(seed, countriesMeta);
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
