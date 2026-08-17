import { getInPlans, getInConstructions } from "@/lib/strapi";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

const line = (p, route) =>
  `- [${p.name}](${SITE_URL}/en/${route}/${p.slug}): ${[p.location, p.type]
    .filter(Boolean)
    .join(", ")}${p.excerpt ? ` — ${p.excerpt}` : ""}`;

export async function GET() {
  let inPlans = [];
  let inConstructions = [];
  try {
    [inPlans, inConstructions] = await Promise.all([
      getInPlans("en"),
      getInConstructions("en"),
    ]);
  } catch {
    // Strapi unreachable — still serve the static parts of the file
  }

  const md = `# Elit Projekt

> Elit Projekt d.o.o. is a Croatian residential real-estate developer. It builds and sells residential properties in Zagreb and on the Adriatic coast — apartment buildings, residential complexes and villas. The site is available in Croatian (/hr) and English (/en).

Contact: info@elitprojekt.com · +385 99 4339 499

## Projects in construction

${(inConstructions ?? []).map((p) => line(p, "in-construction")).join("\n") || "- See " + SITE_URL + "/en/in-construction"}

## Projects in plan

${(inPlans ?? []).map((p) => line(p, "in-plan")).join("\n") || "- See " + SITE_URL + "/en/in-plan"}

## Pages

- [Home (EN)](${SITE_URL}/en): Overview of current projects
- [Home (HR)](${SITE_URL}/hr): Početna stranica
- [In construction](${SITE_URL}/en/in-construction): Projects currently being built
- [In plan](${SITE_URL}/en/in-plan): Upcoming projects
- [About us](${SITE_URL}/en/about-us): Company profile
- [Contact](${SITE_URL}/en/contact): Contact form, email and phone

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(md, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
