import { pageAlternates } from "@/lib/seo";
import ContactHero from "./ContactHero";
import PlanedProjects from "@/sections/PlanedProjects";
import ContactSection from "@/sections/ContactSection";
import FaqComponent from "@/components/FaqComponent";
import { getHomepage, getInPlans } from "@/lib/strapi";

const META = {
  hr: {
    title: "Kontakt | ElitProjekt Zagreb - Stambeni objekti Hrvatska",
    description:
      "Kontaktirajte ElitProjekt za stambene objekte u Zagrebu i na Jadranu. Tel: +385 99 4339 499, email: info@elitprojekt.com. Besplatne konzultacije.",
  },
  en: {
    title: "Contact | ElitProjekt Zagreb - Residential properties Croatia",
    description:
      "Contact ElitProjekt for residential properties in Zagreb and on the Adriatic. Tel: +385 99 4339 499, email: info@elitprojekt.com. Free consultations.",
  },
  de: {
    title: "Kontakt | ElitProjekt Zagreb - Wohnobjekte Kroatien",
    description:
      "Kontaktieren Sie ElitProjekt für Wohnobjekte in Zagreb und an der Adria. Tel: +385 99 4339 499, E-Mail: info@elitprojekt.com. Kostenlose Beratung.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = META[locale] ?? META.hr;
  return {
    alternates: pageAlternates(locale, "/contact"),
    title: meta.title,
    description: meta.description,
  };
}

const ContactPage = async ({ params }) => {
  const { locale } = await params;

  const [content, inPlans] = await Promise.all([
    getHomepage(locale),
    getInPlans(locale),
  ]);

  return (
    <>
      <ContactHero locale={locale} />
      <div className="pt-12">
      <PlanedProjects locale={locale} content={content} projects={inPlans} />
      <ContactSection locale={locale} content={content} />
      <FaqComponent locale={locale} content={content} />
      </div>
    </>
  );
};

export default ContactPage;
