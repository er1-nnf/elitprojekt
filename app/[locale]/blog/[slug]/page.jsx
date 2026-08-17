import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/strapi";
import { toUrlLocale } from "@/lib/locales";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elitprojekt.com";

// Strapi's shareImage can be a media object; the old code passed the raw
// value straight into the og:image meta tag. Normalize to a URL string here.
const toImageUrl = (value) =>
  (typeof value === "object" && value !== null ? value.url : value) || null;

export async function generateStaticParams() {
  const entries = await getAllBlogSlugs();
  return entries.map((entry) => ({
    locale: toUrlLocale(entry.locale),
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const blog = await getBlogBySlug(slug, locale);
  if (!blog) return {};

  const shareImage =
    toImageUrl(blog?.blogSeo?.shareImage) ||
    toImageUrl(blog?.featuredImage) ||
    "/default-share-image.jpg";

  return {
    title: blog?.blogSeo?.metaTitle,
    description: blog?.blogSeo?.metaDescription,
    openGraph: {
      title: blog?.blogSeo?.metaTitle,
      description: blog?.blogSeo?.metaDescription,
      images: [
        {
          url: shareImage,
          alt: blog?.blogSeo?.shareImageAlt || blog?.blogSeo?.metaTitle,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
      url: `${SITE_URL}/${locale}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.blogSeo?.metaTitle,
      description: blog?.blogSeo?.metaDescription,
      images: [shareImage],
    },
  };
}

const BlogDetails = async ({ params }) => {
  const { locale, slug } = await params;
  const blog = await getBlogBySlug(slug, locale);

  if (!blog) notFound();

  const isoDate = blog?.publishedAt;
  const dateObj = new Date(isoDate);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return (
    <>
      <div className="px-4 py-32 bg-white flex flex-col items-center justify-center">
        <h1 className="text-ink font-display font-semibold tracking-[-0.02em] lg:text-[56px] text-[30px] max-w-[800px] text-center text-pretty leading-none pt-12 pb-4 w-full">
          {blog.Title}
        </h1>
        <p className="text-dark-text text-xl font-normal max-w-[700px] text-center tracking-wide leading-relaxed">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-center gap-16 pt-4 pb-16">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-dark-text text-sm font-bold uppercase">Date</p>
            <p className="text-light-text text-sm font-semibold">
              {formattedDate}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-dark-text text-sm font-bold uppercase">Author</p>
            <p className="text-light-text text-sm font-semibold">
              {blog.authorName}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-dark-text text-sm font-bold uppercase">
              Read Time
            </p>
            <p className="text-light-text text-sm font-semibold">
              {blog.readTime} Minutes
            </p>
          </div>
        </div>
        {blog?.coverImage?.url && (
          <Image
            src={blog.coverImage.url}
            alt={blog.Title}
            width={blog.coverImage.width || 1400}
            height={blog.coverImage.height || 800}
            priority
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[800px] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] lg:rounded-[70px] xl:rounded-[80px] max-w-[1400px]"
          />
        )}
        <div className="text-light-text text-lg leading-relaxed mb-6 mt-24 max-w-[800px] whitespace-pre-wrap">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
