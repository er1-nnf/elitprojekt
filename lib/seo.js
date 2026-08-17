export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://elitprojekt.com";

// Canonical + hreflang alternates for a page. `path` is the locale-less
// route ("" for home, "/in-plan/trogir-centar", ...).
export function pageAlternates(locale, path = "") {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      hr: `${SITE_URL}/hr${path}`,
      en: `${SITE_URL}/en${path}`,
      "x-default": `${SITE_URL}/hr${path}`,
    },
  };
}
