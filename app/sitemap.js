import {
  getAllInPlanSlugs,
  getAllInConstructionSlugs,
} from "@/lib/strapi";
import { URL_LOCALES, toUrlLocale } from "@/lib/locales";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elitprojekt.com";

export default async function sitemap() {
  const staticPaths = ["", "/about-us", "/contact", "/in-plan", "/in-construction"];

  const entries = URL_LOCALES.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    }))
  );

  try {
    const [inPlans, inConstructions] = await Promise.all([
      getAllInPlanSlugs(),
      getAllInConstructionSlugs(),
    ]);

    for (const p of inPlans) {
      entries.push({
        url: `${SITE_URL}/${toUrlLocale(p.locale)}/in-plan/${p.slug}`,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
    for (const p of inConstructions) {
      entries.push({
        url: `${SITE_URL}/${toUrlLocale(p.locale)}/in-construction/${p.slug}`,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  } catch (err) {
    console.error("sitemap: failed to fetch project slugs", err);
  }

  return entries;
}
