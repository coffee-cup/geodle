import { describe, it, expect } from "vitest";
import { searchCountries, getAllCountries } from "@/lib/countries";

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
});
