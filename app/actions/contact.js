"use server";

const API_PATH =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://exuberant-charity-7a1a3f0618.strapiapp.com";

async function submit(endpoint, token, data) {
  const res = await fetch(`${API_PATH}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  return { ok: res.ok };
}

// Big contact form (ContactPage) -> /api/homepage-forms
export async function submitHomepageForm(data) {
  try {
    return await submit(
      "/api/homepage-forms",
      process.env.STRAPI_HOMEPAGE_FORM_TOKEN,
      data
    );
  } catch (err) {
    console.error("homepage-form submit failed:", err);
    return { ok: false };
  }
}

// Mini contact form (project detail pages) -> /api/contact-forms
export async function submitContactForm(data) {
  try {
    return await submit(
      "/api/contact-forms",
      process.env.STRAPI_CONTACT_FORM_TOKEN,
      data
    );
  } catch (err) {
    console.error("contact-form submit failed:", err);
    return { ok: false };
  }
}
