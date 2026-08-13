import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Strapi webhook target. Configure in Strapi: Settings -> Webhooks,
// URL: https://<site>/api/revalidate?secret=<REVALIDATE_SECRET>,
// events: entry.publish / entry.unpublish / entry.update / entry.delete.
const MODEL_TAGS = {
  homepage: ["homepage"],
  "in-plan": ["in-plans"],
  "in-construction": ["in-constructions"],
};

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let model = null;
  try {
    const body = await request.json();
    model = body?.model ?? null;
  } catch {
    // no body -> revalidate everything
  }

  const tags = model
    ? MODEL_TAGS[model] ?? []
    : Object.values(MODEL_TAGS).flat();

  for (const tag of tags) {
    // { expire: 0 } = immediate expiration, required for external webhooks
    revalidateTag(tag, { expire: 0 });
  }

  return NextResponse.json({ revalidated: tags });
}
