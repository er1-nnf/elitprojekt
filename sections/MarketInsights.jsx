import BlogPost from "@/components/BlogPost";

const MarketInsights = ({ locale, content, blogs }) => {
  return (
    <div className="flex items-center justify-center lg:px-44 px-4">
    <div className="flex items-center justify-center w-full max-w-[1400px] bg-white pt-32">
      <div className="w-full">
        <div
          className="
            grid gap-8
            grid-cols-1        /* 1 column on mobile */
            sm:grid-cols-2     /* 2 columns on small screens */
            lg:grid-cols-3     /* 3 columns on large screens */
            justify-center
          "
        >
          {blogs?.map((blog, index) => (
            <div key={index} className="w-full">
              <BlogPost
                image={blog.coverImage.url}
                name={blog.Title}
                shortDescription={blog.excerpt}
                id={blog.id}
                slug={blog.slug}
                locale={locale}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MarketInsights;
