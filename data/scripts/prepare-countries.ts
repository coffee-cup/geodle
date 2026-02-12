import { geoCentroid } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";

const SOURCE_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";

const OUT_DIR = "src/data";

interface CountryMeta {
  code: string;
  name: string;
  aliases: string[];
  centroid: [number, number];
  difficulty: "easy" | "medium" | "hard";
}

// Countries widely recognized as large/distinctive silhouettes
const EASY_CODES = new Set([
  "USA", "RUS", "CAN", "CHN", "BRA", "AUS", "IND", "ARG", "KAZ", "SAU",
  "MEX", "IDN", "SDN", "LBY", "IRN", "MNG", "PER", "TCD", "NER", "AGO",
  "MLI", "ZAF", "COL", "ETH", "BOL", "MRT", "EGY", "TZA", "NGA", "VEN",
  "PAK", "NAM", "MOZ", "TUR", "CHL", "ZMB", "MMR", "AFG", "SOM", "COD",
  "JPN", "NOR", "SWE", "FIN", "GBR", "ITA", "FRA", "ESP", "DEU", "POL",
  "NZL", "PNG", "MYS", "THA", "VNM", "PHL", "MAR", "DZA", "IRQ", "UKR",
]);

const HARD_CODES = new Set([
  "BRN", "BHR", "QAT", "SGP", "LUX", "MNE", "MKD", "SVN", "SWZ", "BDI",
  "RWA", "DJI", "GNB", "TLS", "CYP", "LBN", "PSE", "KWT", "TTO",
]);

function getDifficulty(code: string): "easy" | "medium" | "hard" {
  if (EASY_CODES.has(code)) return "easy";
  if (HARD_CODES.has(code)) return "hard";
  return "medium";
}

async function main() {
  console.log("Downloading Natural Earth data...");
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

  const raw = (await res.json()) as FeatureCollection;
  console.log(`Downloaded ${raw.features.length} features`);

  const meta: CountryMeta[] = [];
  const geoFeatures: Feature<Geometry, { code: string }>[] = [];

  for (const feature of raw.features) {
    const props = feature.properties!;
    let code: string = props.ISO_A3;
    if (code === "-99") code = props.ADM0_A3;
    if (!code || code === "-99") continue;
    if (code === "ATA") continue;

    const name: string = props.NAME;
    const centroid = geoCentroid(feature) as [number, number];

    meta.push({
      code,
      name,
      aliases: [],
      centroid: [+centroid[0].toFixed(2), +centroid[1].toFixed(2)],
      difficulty: getDifficulty(code),
    });

    geoFeatures.push({
      type: "Feature",
      geometry: feature.geometry,
      properties: { code },
    });
  }

  meta.sort((a, b) => a.name.localeCompare(b.name));

  const geojson: FeatureCollection<Geometry, { code: string }> = {
    type: "FeatureCollection",
    features: geoFeatures,
  };

  const countriesList = meta.map(({ code, name }) => ({ code, name }));

  const { mkdirSync, writeFileSync } = await import("fs");
  mkdirSync(OUT_DIR, { recursive: true });

  writeFileSync(`${OUT_DIR}/countries.geojson.json`, JSON.stringify(geojson));
  writeFileSync(`${OUT_DIR}/countries-meta.json`, JSON.stringify(meta, null, 2));
  writeFileSync(`${OUT_DIR}/countries-list.json`, JSON.stringify(countriesList, null, 2));

  const easy = meta.filter((c) => c.difficulty === "easy").length;
  const medium = meta.filter((c) => c.difficulty === "medium").length;
  const hard = meta.filter((c) => c.difficulty === "hard").length;
  console.log(`Wrote ${meta.length} countries (${easy} easy, ${medium} medium, ${hard} hard)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
