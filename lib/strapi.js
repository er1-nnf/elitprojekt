import { toStrapiLocale } from "./locales";

const API_PATH =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://exuberant-charity-7a1a3f0618.strapiapp.com";

export const IMG_PATH =
  "https://diplan-strapi-aws-s3-images-bucket.s3.eu-north-1.amazonaws.com";

// Server-side fetch wrapper. Every call is cached and tagged so a Strapi
// webhook hitting /api/revalidate can regenerate the affected pages.
async function strapiFetch(path, { tags, revalidate = 3600 } = {}) {
  const res = await fetch(`${API_PATH}${path}`, {
    next: { tags, revalidate },
  });
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${path}`);
  }
  const json = await res.json();
  return json.data;
}

export function getHomepage(urlLocale) {
  const locale = toStrapiLocale(urlLocale);
  return strapiFetch(`/api/homepage?locale=${locale}&populate=*`, {
    tags: ["homepage"],
  });
}

export function getInPlans(urlLocale) {
  const locale = toStrapiLocale(urlLocale);
  return strapiFetch(`/api/in-plans?locale=${locale}&populate=*`, {
    tags: ["in-plans"],
  });
}

export function getInConstructions(urlLocale) {
  const locale = toStrapiLocale(urlLocale);
  return strapiFetch(`/api/in-constructions?locale=${locale}&populate=*`, {
    tags: ["in-constructions"],
  });
}

export async function getInPlanBySlug(slug, urlLocale) {
  const locale = toStrapiLocale(urlLocale);
  const data = await strapiFetch(
    `/api/in-plans?filters[slug][$eq]=${encodeURIComponent(slug)}&locale=${locale}&populate=*`,
    { tags: ["in-plans"] }
  );
  return data?.[0] ?? null;
}

export async function getInConstructionBySlug(slug, urlLocale) {
  const locale = toStrapiLocale(urlLocale);
  const data = await strapiFetch(
    `/api/in-constructions?filters[slug][$eq]=${encodeURIComponent(slug)}&locale=${locale}&populate=*`,
    { tags: ["in-constructions"] }
  );
  return data?.[0] ?? null;
}

// Slug lists for generateStaticParams (all locales).
export async function getAllInPlanSlugs() {
  const data = await strapiFetch(
    `/api/in-plans?locale=*&fields[0]=slug&fields[1]=locale&fields[2]=updatedAt&pagination[pageSize]=100`,
    { tags: ["in-plans"] }
  );
  return data ?? [];
}

export async function getAllInConstructionSlugs() {
  const data = await strapiFetch(
    `/api/in-constructions?locale=*&fields[0]=slug&fields[1]=locale&fields[2]=updatedAt&pagination[pageSize]=100`,
    { tags: ["in-constructions"] }
  );
  return data ?? [];
}

// The blogs collection does not exist on the current Strapi instance
// (its /api/blogs returns 404; the blog was already dormant in the old app).
// These helpers swallow that so blog routes render empty instead of failing builds.
export async function getBlogs(urlLocale) {
  const locale = toStrapiLocale(urlLocale);
  try {
    const data = await strapiFetch(`/api/blogs?locale=${locale}&populate=*`, {
      tags: ["blogs"],
    });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getBlogBySlug(slug, urlLocale) {
  const locale = toStrapiLocale(urlLocale);
  try {
    const data = await strapiFetch(
      `/api/blogs?filters[slug][$eq]=${encodeURIComponent(slug)}&locale=${locale}&populate=*`,
      { tags: ["blogs"] }
    );
    return data?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAllBlogSlugs() {
  try {
    const data = await strapiFetch(
      `/api/blogs?locale=*&fields[0]=slug&fields[1]=locale&pagination[pageSize]=100`,
      { tags: ["blogs"] }
    );
    return data ?? [];
  } catch {
    return [];
  }
}
