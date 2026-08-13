import Image from "next/image";
import contactImg from "@/assets/images/contactImage.webp";
import ContactForm from "@/components/ContactForm";
import { toStrapiLocale } from "@/lib/locales";

const ContactSection = ({ locale, content }) => {
  const strapiLocale = toStrapiLocale(locale);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-0 h-auto lg:h-screen w-full overflow-hidden">
      <div className="relative flex flex-col items-end justify-end overflow-hidden h-[450px] lg:h-screen w-full">
        <Image
          src={contactImg}
          alt="Contact us"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="bg-dark-text w-full flex flex-col justify-between px-8 py-8">
        <p className="text-white font-medium text-5xl pb-2">
          {strapiLocale === "hr-HR"
            ? "Tražite nešto posebno?"
            : "Looking for something special?"}
        </p>
        <p className="text-white font-normal text-xl pb-4">
          {strapiLocale === "hr-HR"
            ? "Recite nam više o svom idealnom domu, a mi ćemo se pobrinuti za ostalo."
            : "Tell us more about your ideal home, and we will take care of the rest."}
        </p>
        <ContactForm locale={locale} />
      </div>
    </div>
  );
};

export default ContactSection;
