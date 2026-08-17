import { pageAlternates } from "@/lib/seo";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import operation from "@/assets/images/whereWeOperate.webp";
import PlanedProjects from "@/sections/PlanedProjects";
import ContactSection from "@/sections/ContactSection";
import FaqComponent from "@/components/FaqComponent";
import { getHomepage, getInPlans } from "@/lib/strapi";
import { toStrapiLocale } from "@/lib/locales";

const API_PATH =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://exuberant-charity-7a1a3f0618.strapiapp.com";

// lib/strapi.js has no about-us helper (and is off-limits), so fetch it here
// with the same caching/tagging pattern.
async function getAboutUs(urlLocale) {
  const locale = toStrapiLocale(urlLocale);
  const res = await fetch(
    `${API_PATH}/api/about-us?locale=${locale}&populate=*`,
    { next: { tags: ["about-us"], revalidate: 3600 } }
  );
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} /api/about-us`);
  }
  const json = await res.json();
  return json.data;
}

const META = {
  hr: {
    title: "O nama | ElitProjekt - Gradnja stambenih objekata Zagreb",
    description:
      "ElitProjekt d.o.o. - tvrtka osnovana 2019. za gradnju i prodaju stambenih objekata u Hrvatskoj. Kvalitetni materijali, potpuna dokumentacija, pouzdanost.",
  },
  en: {
    title: "About Us | ElitProjekt - Residential construction Zagreb",
    description:
      "ElitProjekt d.o.o. - a company founded in 2019 for the construction and sale of residential properties in Croatia. Quality materials, complete documentation, reliability.",
  },
  de: {
    title: "Über uns | ElitProjekt - Bau von Wohnobjekten Zagreb",
    description:
      "ElitProjekt d.o.o. - ein 2019 gegründetes Unternehmen für den Bau und Verkauf von Wohnobjekten in Kroatien. Hochwertige Materialien, vollständige Dokumentation, Zuverlässigkeit.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = META[locale] ?? META.hr;
  return {
    alternates: pageAlternates(locale, "/about-us"),
    title: meta.title,
    description: meta.description,
  };
}

const AboutPage = async ({ params }) => {
  const { locale } = await params;

  const [content, aboutContent, inPlans] = await Promise.all([
    getHomepage(locale),
    getAboutUs(locale),
    getInPlans(locale),
  ]);

  return (
    <>
      {/* Main content container */}
      <div className="pt-32 flex flex-col items-start justify-center gap-6 sm:gap-8 lg:gap-10 bg-white px-4 sm:px-6 md:px-8 lg:px-8">

        {/* Hero title */}
        <h1 className="font-display font-semibold tracking-[-0.02em] text-[32px] sm:text-[40px] md:text-[50px] lg:text-[58px] xl:text-[64px] max-w-full lg:max-w-[900px] text-balance leading-[1.02]">
          {aboutContent?.heroTitle}
        </h1>

        {/* About content section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12 lg:gap-16 xl:gap-32 w-full">

          {/* About image */}
          <div className="relative w-full lg:w-1/2 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] overflow-hidden h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] order-1 lg:order-1">
            {aboutContent?.aboutImage?.url && (
              <Image
                src={aboutContent.aboutImage.url}
                alt="About us"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* About text content */}
          <div className="prose prose-sm sm:prose-base lg:prose-lg text-sm sm:text-base lg:text-lg leading-tight w-full lg:w-1/2 order-2 lg:order-2">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h3
                    className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-4xl font-semibold text-dark-text mt-4 sm:mt-6 mb-2 sm:mb-3 leading-tight"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-lg sm:text-xl font-bold text-dark-text mt-4 sm:mt-6 mb-2 sm:mb-3"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-3 sm:mb-4 leading-relaxed" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold text-dark-text" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 space-y-1" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="leading-relaxed" {...props} />
                ),
              }}
            >
              {aboutContent?.heroSubtitle}
            </ReactMarkdown>
          </div>
        </div>

        {/* Work location section */}
        <h1 className="font-display font-semibold tracking-[-0.02em] text-[32px] sm:text-[40px] md:text-[50px] lg:text-[58px] xl:text-[64px] max-w-full lg:max-w-[900px] text-balance leading-[1.02] mt-16 sm:mt-20 md:mt-24 lg:mt-32">
          {aboutContent?.workLocation}
        </h1>

        {/* Operation map image */}
        <div className="w-full rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src={operation}
            alt="Where we operate"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Additional sections */}
      <div className="pt-8 sm:pt-10 lg:pt-12">
        <PlanedProjects locale={locale} content={content} projects={inPlans} />
        <ContactSection locale={locale} content={content} />
        <FaqComponent locale={locale} content={content} />
      </div>
    </>
  );
};

export default AboutPage;
