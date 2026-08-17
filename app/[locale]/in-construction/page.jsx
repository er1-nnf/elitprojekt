import ProjectCard from "@/components/ProjectCard";
import FaqComponent from "@/components/FaqComponent";
import PlanedProjects from "@/sections/PlanedProjects";
import ContactSection from "@/sections/ContactSection";
import { getHomepage, getInPlans, getInConstructions } from "@/lib/strapi";
import { toStrapiLocale } from "@/lib/locales";

const sortBySortNumber = (projects) =>
  [...projects].sort((a, b) => {
    const sortA = a.sortNumber || 0;
    const sortB = b.sortNumber || 0;
    return sortA - sortB;
  });

export async function generateMetadata() {
  return {
    title: "U Izgradnji | ElitProjekt | Stanovi Zagreb & Jadranska obala",
    description:
      "Pogledajte aktualne projekte u izgradnji ElitProjekt - stanovi u Zagrebu, objekti na jadranskoj obali. Kvalitetna gradnja, moderna rješenja, potpuna dokumentacija.",
  };
}

const InConstruction = async ({ params }) => {
  const { locale } = await params;
  const strapiLocale = toStrapiLocale(locale);

  const [content, inConstructions, inPlans] = await Promise.all([
    getHomepage(locale),
    getInConstructions(locale),
    getInPlans(locale),
  ]);

  // Sort projects by sortNumber (ascending: 1, 2, 3, etc.)
  const projects = sortBySortNumber(inConstructions ?? []);
  const planedProjects = sortBySortNumber(inPlans ?? []);

  return (
    <>
      <div className="px-4 sm:px-6 md:px-8 lg:px-11 xl:px-11 pt-32 flex flex-col items-center justify-center bg-white">
      <h3 className="font-medium text-[35px] sm:text-[48px] md:text-[48px] lg:text-[48px] xl:text-[57px] 2xl:text-[60px] text-center leading-tight text-dark-color">
          {strapiLocale === "hr-HR" ? "Pregledajte naše nekretnine" : "View our properties"}
        </h3>

        <p className="font-normal text-sm sm:text-base md:text-base lg:text-base text-center pretty tracking-wide leading-5 sm:leading-6 md:leading-7 max-w-[90%] sm:max-w-[550px] md:max-w-[650px] text-light-gray px-2 pb-12">
          {strapiLocale === "hr-HR" ? "Od novogradnje u Zagrebu do obalnih vila - u našoj ponudi pronaći ćete dom koji odgovara vašem stilu života." : "From new construction in Zagreb to coastal villas - in our offer you will find a home that matches your lifestyle."}
        </p>
        <div className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-11 pb-32">
          {projects?.map((project, index) => (
            <ProjectCard
              key={index}
              image={project.coverImage.url}
              name={project.name}
              location={project.location}
              type={project.type}
              shortDescription={project.excerpt}
              id={project.id}
              slug={project.slug}
              route={"in-construction"}
              content={content}
              locale={locale}
            />
          ))}
        </div>
      </div>
      <PlanedProjects
        locale={locale}
        content={content}
        projects={planedProjects}
      />
      <ContactSection locale={locale} content={content} />
      <FaqComponent content={content} />
    </>
  );
};

export default InConstruction;
