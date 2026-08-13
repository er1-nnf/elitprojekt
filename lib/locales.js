// URL segment <-> Strapi locale mapping.
// URLs use short codes (/hr, /en, /de); Strapi uses hr-HR, en, de-DE.
export const LOCALES = [
  { url: "hr", strapi: "hr-HR", label: "HR", lang: "hr" },
  { url: "en", strapi: "en", label: "EN", lang: "en" },
  // German is prepared in the UI strings but has no content in Strapi yet
  // (homepage/about-us return 404 for de-DE, project lists are empty).
  // Uncomment once the content exists:
  // { url: "de", strapi: "de-DE", label: "DE", lang: "de" },
];

export const DEFAULT_LOCALE = "hr";

export const URL_LOCALES = LOCALES.map((l) => l.url);

export function toStrapiLocale(urlLocale) {
  return LOCALES.find((l) => l.url === urlLocale)?.strapi ?? "hr-HR";
}

export function toUrlLocale(strapiLocale) {
  return LOCALES.find((l) => l.strapi === strapiLocale)?.url ?? DEFAULT_LOCALE;
}

export function localeHref(urlLocale, path) {
  return `/${urlLocale}${path === "/" ? "" : path}` || `/${urlLocale}`;
}
