import HeroSection from "@/sections/HeroSection";
import PlanedProjects from "@/sections/PlanedProjects";
import ConstructionProjects from "@/sections/ConstructionProjects";
import ContactSection from "@/sections/ContactSection";
import FullScreenVideoSection from "@/components/FullScreenVideoSection";
import FaqComponent from "@/components/FaqComponent";
import { getHomepage, getInPlans, getInConstructions } from "@/lib/strapi";

const META = {
  hr: {
    title:
      "ElitProjekt | Stambeni objekti izgradnja i prodaja Zagreb & Jadranska obala",
    description:
      "Otkrijte ekskluzivnu ponudu stambenih objekata ElitProjekt u Zagrebu i na jadranskoj obali. Kvalitetni projekti, premium lokacije, profesionalna usluga.",
  },
  en: {
    title:
      "ElitProjekt | Residential construction and sales Zagreb & Adriatic coast",
    description:
      "Discover ElitProjekt's exclusive offer of residential properties in Zagreb and on the Adriatic coast. Quality projects, premium locations, professional service.",
  },
  de: {
    title:
      "ElitProjekt | Bau und Verkauf von Wohnobjekten Zagreb & Adriaküste",
    description:
      "Entdecken Sie das exklusive Angebot von ElitProjekt an Wohnobjekten in Zagreb und an der Adriaküste. Hochwertige Projekte, Premium-Lagen, professioneller Service.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = META[locale] ?? META.hr;
  return {
    title: meta.title,
    description: meta.description,
  };
}

const HomePage = async ({ params }) => {
  const { locale } = await params;

  const [content, inConstructions, inPlans] = await Promise.all([
    getHomepage(locale),
    getInConstructions(locale),
    getInPlans(locale),
  ]);

  return (
    <>
      <HeroSection locale={locale} content={content} />
      <FullScreenVideoSection videoUrl="/video/elitProjektVideo_optimized.mp4" />
      <ConstructionProjects
        locale={locale}
        content={content}
        projects={inConstructions}
      />
      <PlanedProjects locale={locale} content={content} projects={inPlans} />
      <ContactSection locale={locale} content={content} />
      <FaqComponent locale={locale} content={content} />
    </>
  );
};

export default HomePage;
