import BlogPost from "@/components/BlogPost";
import { getBlogs } from "@/lib/strapi";

// NOTE: the old BlogPage read blogs?.blogSeo?.metaTitle for the <Helmet>
// title, but `blogs` is an array so both values were always undefined.
// Behavior preserved: no page-specific metadata, falls back to the layout.
export async function generateMetadata() {
  return {};
}

const BlogPage = async ({ params }) => {
  const { locale } = await params;
  const blogs = await getBlogs(locale);

  return (
    <>
      <div className="px-4 py-32 flex flex-col items-center justify-center bg-white">
        <h1 className="font-display font-semibold tracking-[-0.02em] text-[48px] sm:text-[56px] text-left mb-8">Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog, index) => (
            <BlogPost
              key={index}
              image={blog.coverImage.url}
              name={blog.Title}
              shortDescription={blog.excerpt}
              id={blog.id}
              slug={blog.slug}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
