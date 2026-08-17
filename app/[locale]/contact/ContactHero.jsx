"use client";

import { motion } from "framer-motion";
import heroImg from "@/assets/images/ElitProjekt-Bukovac-2.jpeg";
import MiniContactForm from "@/components/MiniContactForm";
import { toStrapiLocale } from "@/lib/locales";

const ContactHero = ({ locale }) => {
  const strapiLocale = toStrapiLocale(locale);

  return (
    <motion.div className="relative flex lg:flex-row flex-col lg:items-start items-center justify-between gap-12 sm:gap-14 md:gap-24 lg:gap-24 xl:gap-32 2xl:gap-56 px-4 sm:px-8 md:px-16 lg:px-8 xl:px-20 2xl:px-44 h-auto md:py-56 py-32">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 90%),
                          linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%),
                          url(${heroImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex flex-col gap-6 z-50">
        <h1 className="text-white font-display font-semibold tracking-[-0.02em] text-3xl sm:text-5xl lg:text-6xl">
          {strapiLocale === "hr-HR" ? "Kontaktiraj nas" : "Contact Us"}
        </h1>
        <p className="text-white font-normal text-lg max-w-[480px]">
          {strapiLocale === "hr-HR"
            ? "Imate pitanje, tražite savjet ili konkretan upit o nekretnini? Javite nam se putem obrasca, e-maila ili telefonom. Tu smo da vam pomognemo pronaći idealan prostor za život ili investiciju."
            : "Do you have a question, need advice, or have a specific inquiry about real estate? Contact us through the form, email, or by phone. We're here to help you find the ideal space for living or investment."}
        </p>
        <p className="text-white font-medium text-xl max-w-[480px] uppercase">
          {strapiLocale === "hr-HR" ? "Kontakt info:" : "Contact info:"}
        </p>
        <a href="mailto:info@elitprojekt.com" className="text-white font-normal text-xl max-w-[480px] underline">
          info@elitprojekt.com
        </a>
        <a href="tel:+385994339499" className="text-white font-normal text-xl max-w-[480px] underline">
          +385 99 4339 499
        </a>
        <p className="text-white font-normal text-md max-w-[480px]">
        {strapiLocale === "hr-HR" ? "Želite razgovarati osobno? Nazovite nas svakim radnim danom od 09 do 17h." : "Want to talk in person? Call us every working day from 9 AM to 5 PM."}
        </p>
      </div>
      <div className="bg-card-bg rounded-[40px] p-12 z-50 w-full lg:w-1/2">
        <MiniContactForm locale={locale} />
      </div>
    </motion.div>
  );
};

export default ContactHero;
