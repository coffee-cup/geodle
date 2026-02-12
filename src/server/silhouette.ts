import { createServerFn } from "@tanstack/react-start";
import { getPuzzleNumber, getAnswerForPuzzle } from "@/lib/puzzle";
import countriesGeojson from "@/data/countries.geojson.json";
import countriesMetaJson from "@/data/countries-meta.json";
import type { CountryMeta, SilhouetteData } from "@/types";
import type { FeatureCollection, Geometry } from "geojson";

const SALT = import.meta.env.PUZZLE_SALT ?? "geodle-default-salt";
const countriesMeta = countriesMetaJson as unknown as CountryMeta[];

export const getDailySilhouette = createServerFn({ method: "GET" }).handler(
  async () => {
    const puzzleNumber = getPuzzleNumber();
    const answer = getAnswerForPuzzle(
      puzzleNumber,
      countriesMeta,
      SALT,
    );

    const geo = countriesGeojson as FeatureCollection<
      Geometry,
      { code: string }
    >;
    const feature = geo.features.find(
      (f) => f.properties.code === answer.code,
    );
    if (!feature) throw new Error("Country geometry not found");

    const silhouette: SilhouetteData = {
      type: "Feature",
      geometry: feature.geometry,
      properties: {},
    };

    return { silhouette, puzzleNumber };
  },
);
