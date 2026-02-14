import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "fs";
import { geoPath, geoNaturalEarth1 } from "d3-geo";
import type { FeatureCollection } from "geojson";

const NE_110M_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch font: ${res.status}`);
  return res.arrayBuffer();
}

async function generateWorldMapPng(): Promise<string> {
  console.log("Downloading world map data...");
  const res = await fetch(NE_110M_URL);
  if (!res.ok) throw new Error(`Failed to fetch NE data: ${res.status}`);
  const geo = (await res.json()) as FeatureCollection;

  const projection = geoNaturalEarth1()
    .fitSize([1200, 630], geo);
  const pathGen = geoPath(projection);

  const paths = geo.features
    .filter((f) => f.properties?.ISO_A3 !== "ATA")
    .map((f) => pathGen(f))
    .filter(Boolean)
    .join(" ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <path d="${paths}" fill="#2c2825" stroke="none"/>
  </svg>`;

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const png = resvg.render().asPng();
  return `data:image/png;base64,${Buffer.from(png).toString("base64")}`;
}

function GridLines() {
  return (
    <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
      {[...Array(50)].map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 24}
          y1={0}
          x2={i * 24}
          y2={630}
          stroke="#d8d3c8"
          strokeWidth={0.5}
        />
      ))}
      {[...Array(27)].map((_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          y1={i * 24}
          x2={1200}
          y2={i * 24}
          stroke="#d8d3c8"
          strokeWidth={0.5}
        />
      ))}
    </svg>
  );
}

function OgImage({ worldMapSrc }: { worldMapSrc: string }) {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#f4f1eb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GridLines />
      <img
        src={worldMapSrc}
        width={1200}
        height={630}
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.08 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0 64px 56px",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontFamily: "Instrument Serif",
            fontSize: "144px",
            color: "#2c2825",
            lineHeight: 1,
          }}
        >
          Geodle
        </div>
        <div
          style={{
            width: "64px",
            height: "3px",
            background: "#c27832",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            fontFamily: "DM Sans",
            fontSize: "38px",
            color: "#8a8279",
            letterSpacing: "0.03em",
          }}
        >
          Guess the country from its silhouette
        </div>
      </div>
    </div>
  );
}

async function main() {
  const [instrumentSerif, dmSans, worldMapSrc] = await Promise.all([
    fetchFont(
      "https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf"
    ),
    fetchFont(
      "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf"
    ),
    generateWorldMapPng(),
  ]);

  console.log("Rendering OG image...");
  const svg = await satori(<OgImage worldMapSrc={worldMapSrc} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Instrument Serif",
        data: instrumentSerif,
        style: "normal",
        weight: 400,
      },
      {
        name: "DM Sans",
        data: dmSans,
        style: "normal",
        weight: 400,
      },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const png = resvg.render().asPng();

  mkdirSync("public", { recursive: true });
  writeFileSync("public/og.png", png);
  console.log("Wrote public/og.png (1200x630)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
