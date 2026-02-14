import { createServerFn } from "@tanstack/react-start";
import { getPuzzleNumber, getAnswerForPuzzle } from "@/lib/puzzle";
import countriesMetaJson from "@/data/countries-meta.json";
import type { CountryMeta, SilhouetteData } from "@/types";

const countriesMeta = countriesMetaJson as unknown as CountryMeta[];

const svgModules = import.meta.glob("/src/data/silhouettes/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export function getSvgByCode(code: string): string {
  const key = `/src/data/silhouettes/${code}.svg`;
  const svg = svgModules[key];
  if (!svg) throw new Error(`SVG not found for ${code}`);
  return svg;
}

export const getDailySilhouette = createServerFn({ method: "GET" }).handler(
  async () => {
    const puzzleNumber = getPuzzleNumber();
    const salt = process.env.PUZZLE_SALT ?? "geodle-default-salt";
    const answer = getAnswerForPuzzle(puzzleNumber, countriesMeta, salt);
    console.log(`[geodle] puzzle #${puzzleNumber} salt=${salt === "geodle-default-salt" ? "DEFAULT" : salt.slice(0, 8) + "…"} answer=${answer.code}`);

    const silhouette: SilhouetteData = { svg: getSvgByCode(answer.code) };
    return { silhouette, puzzleNumber };
  },
);
