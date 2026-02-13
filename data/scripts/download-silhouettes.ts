import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const OUT_DIR = "src/data/silhouettes";
const INDEX_URL = "https://borderly.dev/data/index/countries.json";

interface BorderlyIndex {
  data: { id: string; iso3: string; name: string }[];
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  console.log("Fetching country index...");
  const res = await fetch(INDEX_URL);
  if (!res.ok) throw new Error(`Failed to fetch index: ${res.status}`);
  const { data: countries }: BorderlyIndex = await res.json();
  console.log(`Found ${countries.length} countries`);

  let downloaded = 0;
  let skipped = 0;
  const failed: string[] = [];

  for (const country of countries) {
    const code = country.iso3.toUpperCase();
    const outPath = join(OUT_DIR, `${code}.svg`);

    if (existsSync(outPath)) {
      skipped++;
      continue;
    }

    try {
      const url = `https://borderly.dev/country/${country.iso3}.svg?fill=000000&stroke=000000`;
      const svgRes = await fetch(url);
      if (!svgRes.ok) {
        failed.push(`${code}: HTTP ${svgRes.status}`);
        continue;
      }

      let svg = await svgRes.text();
      svg = svg.replaceAll("#000000", "currentColor").replaceAll("000000", "currentColor");

      writeFileSync(outPath, svg);
      downloaded++;

      if (downloaded % 20 === 0) console.log(`  ${downloaded} downloaded...`);
    } catch (err) {
      failed.push(`${code}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  console.log(`Done: ${downloaded} downloaded, ${skipped} skipped (existing)`);
  if (failed.length) {
    console.log(`Failed (${failed.length}):`);
    for (const f of failed) console.log(`  ${f}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
