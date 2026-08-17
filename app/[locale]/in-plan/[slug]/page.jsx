import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import MiniContactForm from "@/components/MiniContactForm";
import DownloadButton from "@/components/DownloadButton";
import FaqComponent from "@/components/FaqComponent";
import ProjectGallery from "@/components/ProjectGallery";
import RudesPixel from "@/components/RudesPixel";
import PlanedProjects from "@/sections/PlanedProjects";
import ContactSection from "@/sections/ContactSection";
import { getHomepage, getInPlans, getInPlanBySlug, getAllInPlanSlugs } from "@/lib/strapi";
import { toStrapiLocale, toUrlLocale } from "@/lib/locales";

const sortBySortNumber = (projects) =>
  [...projects].sort((a, b) => {
    const sortA = a.sortNumber || 0;
    const sortB = b.sortNumber || 0;
    return sortA - sortB;
  });

export async function generateStaticParams() {
  const entries = await getAllInPlanSlugs();
  return entries.map((entry) => ({
    locale: toUrlLocale(entry.locale),
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = await getInPlanBySlug(slug, locale);
  if (!project) return {};
  return {
    title: `${project?.name} | ${project?.location} | Elit Projekt`,
    description: project?.description?.substring(0, 160),
  };
}

const InPlanDetails = async ({ params }) => {
  const { locale, slug } = await params;
  const strapiLocale = toStrapiLocale(locale);

  const [project, content, inPlans] = await Promise.all([
    getInPlanBySlug(slug, locale),
    getHomepage(locale),
    getInPlans(locale),
  ]);

  if (!project) notFound();

  const planedProjects = sortBySortNumber(inPlans ?? []);

  return (
    <>
      {/* Meta Pixel initialization for specific slug */}
      {slug === "projekt-zagreb-rudes" && <RudesPixel />}

      <div className="min-h-screen bg-white pt-32 lg:pt-44">
        <div className="mx-auto px-4 lg:px-8">
          {/* Property Title Mobile */}
          <h1 className="font-display font-semibold tracking-[-0.02em] text-4xl lg:text-5xl text-ink flex lg:hidden pb-4">
            {project?.name}
          </h1>

          {/* Location and Type Tags Mobile */}
          <div className="flex lg:hidden flex-wrap gap-4 pb-8">
            <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 rounded-full">
              <svg
                className="w-3.5 h-3.5 text-muted"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-[12px] tracking-[0.08em] uppercase text-light-gray">
                {project?.location}
              </span>
            </div>

            <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 rounded-full">
              <svg
                className="w-3.5 h-3.5 text-muted"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="text-[12px] tracking-[0.08em] uppercase text-light-gray">
                {project?.type}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Image Gallery */}
            <div className="order-1 lg:order-1">
              <ProjectGallery
                name={project?.name}
                images={project?.images}
                apartOneImages={project?.apartOneImages}
                apartTwoImages={project?.apartTwoImages}
              />
            </div>

            {/* Right Column - Property Details */}
            <div className="order-2 lg:order-2">
              <div className="space-y-6">
                {/* Property Title */}
                <h1 className="font-display font-semibold tracking-[-0.02em] text-4xl lg:text-5xl text-ink hidden lg:flex">
                  {project?.name}
                </h1>

                {/* Location and Type Tags */}
                <div className="hidden lg:flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 rounded-full">
                    <svg
                      className="w-3.5 h-3.5 text-muted"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[12px] tracking-[0.08em] uppercase text-light-gray">
                      {project?.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 border border-hairline bg-white px-4 py-2 rounded-full">
                    <svg
                      className="w-3.5 h-3.5 text-muted"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="text-[12px] tracking-[0.08em] uppercase text-light-gray">
                      {project?.type}
                    </span>
                  </div>
                </div>

                {/* Main Description */}
                <div className="prose prose-lg text-lg leading-tight">
                  <ReactMarkdown
                    components={{
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-xl font-bold text-dark-text mt-6 mb-3"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-4 leading-relaxed" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          className="font-bold text-dark-text"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc pl-6 mb-4 space-y-1"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="leading-relaxed" {...props} />
                      ),
                    }}
                  >
                    {project?.description}
                  </ReactMarkdown>
                </div>
                {/* Bottom Section - Map and Contact Form if apart*/}
                {project?.apartOneImages &&
                  project.apartOneImages.length > 0 && (
                    <div className="grid grid-cols-1 gap-8 lg:gap-16 mt-16 pb-16 pt-6">
                      {/* Contact Form */}
                      <div className="order-2 bg-white drop-shadow-lg p-6 rounded-2xl">
                        <MiniContactForm locale={locale} />
                      </div>

                      {/* Google Maps */}
                      <div className="order-1">
                        <div className="relative w-full h-[380px] rounded-2xl overflow-hidden">
                          {project?.googleMaps ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: project.googleMaps,
                              }}
                              className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <p className="text-gray-500">Map not available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Bottom Section - Map and Contact Form if no apart*/}
          {project?.apartOneImages === null && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-16 pb-16">
              {/* Contact Form */}
              <div className="order-2 lg:order-1 bg-white drop-shadow-lg p-6 rounded-2xl">
                <MiniContactForm locale={locale} />
              </div>

              {/* Google Maps */}
              <div className="order-1 lg:order-2">
                <div className="relative w-full h-[380px] rounded-2xl overflow-hidden">
                  {project?.googleMaps ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: project.googleMaps }}
                      className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-500">Map not available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hide default Swiper navigation */}
        <style>{`
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
          .swiper-pagination {
            bottom: 16px !important;
          }
          .swiper-pagination-bullet {
            background: white !important;
            opacity: 0.7 !important;
          }
          .swiper-pagination-bullet-active {
            opacity: 1 !important;
          }
        `}</style>
      </div>
      <div className="bg-green w-full flex flex-col gap-10 items-center justify-center py-12 px-4 sm:px-10 md:px-20 lg:px-32 xl:px-44 mb-16">
        <h3 className="text-white font-display font-semibold tracking-[-0.02em] text-4xl sm:text-5xl">
          {strapiLocale === "hr-HR" ? "Tlocrt nekretnine" : "Property blueprint"}
        </h3>
        <DownloadButton
          text={strapiLocale === "hr-HR" ? "Tlocrt nekretnine" : "Property blueprint"}
          blueprint={project?.blueprint} // Pass the entire blueprint object
        />
        {project?.blueprintImage?.url && (
          <Image
            src={project.blueprintImage.url}
            alt={""}
            width={project.blueprintImage.width || 1920}
            height={project.blueprintImage.height || 1080}
            className="w-full object-contain"
          />
        )}
      </div>
      <PlanedProjects locale={locale} content={content} projects={planedProjects} />
      <ContactSection locale={locale} content={content} />
      <FaqComponent content={content} />
    </>
  );
};

export default InPlanDetails;
