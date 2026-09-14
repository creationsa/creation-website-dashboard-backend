import { Option } from "./types";

export async function fetchCountries(locale: string): Promise<Option[]> {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca2,translations",
  );
  if (!res.ok) throw new Error("Failed to fetch countries");

  const data: {
    name: { common: string };
    cca2: string;
    translations: { ara?: { common: string } };
  }[] = await res.json();

  return data
    .map((c) => ({
      value: c.cca2,
      label:
        locale === "ar"
          ? (c.translations.ara?.common ?? c.name.common)
          : c.name.common,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, locale));
}
