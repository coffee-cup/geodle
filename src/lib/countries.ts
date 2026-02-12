import fuzzysort from "fuzzysort";
import countriesList from "@/data/countries-list.json";
import type { CountryListItem } from "@/types";

const prepared = (countriesList as CountryListItem[]).map((c) => ({
  ...c,
  preparedName: fuzzysort.prepare(c.name),
}));

export function searchCountries(query: string, limit = 8): CountryListItem[] {
  if (!query.trim()) return [];
  const results = fuzzysort.go(query, prepared, {
    key: "preparedName",
    limit,
    threshold: 0.3,
  });
  return results.map((r) => ({ code: r.obj.code, name: r.obj.name }));
}

export function getCountryName(code: string): string | undefined {
  return (countriesList as CountryListItem[]).find(
    (c) => c.code === code,
  )?.name;
}

export function getAllCountries(): CountryListItem[] {
  return countriesList as CountryListItem[];
}
