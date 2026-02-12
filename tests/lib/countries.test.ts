import { describe, it, expect } from "vitest";
import { searchCountries, getAllCountries } from "@/lib/countries";
import countriesMeta from "@/data/countries-meta.json";
import countriesGeojson from "@/data/countries.geojson.json";

describe("searchCountries", () => {
  it("'united' matches US and UK", () => {
    const results = searchCountries("united");
    const codes = results.map((r) => r.code);
    expect(codes).toContain("USA");
    expect(codes).toContain("GBR");
  });

  it("empty query returns empty", () => {
    expect(searchCountries("")).toHaveLength(0);
  });

  it("returns limited results", () => {
    const results = searchCountries("a", 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });
});

describe("data integrity", () => {
  it("no duplicate codes in countries-list", () => {
    const countries = getAllCountries();
    const codes = countries.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("meta and geojson have matching country sets", () => {
    const metaCodes = new Set(
      (countriesMeta as { code: string }[]).map((c) => c.code),
    );
    const geoCodes = new Set(
      (countriesGeojson as { features: { properties: { code: string } }[] })
        .features.map((f) => f.properties.code),
    );
    expect(metaCodes.size).toBe(geoCodes.size);
    for (const code of metaCodes) {
      expect(geoCodes.has(code)).toBe(true);
    }
  });
});
