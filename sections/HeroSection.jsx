"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import trogir from "@/assets/images/trogirCentar.webp";
import borovje from "@/assets/images/stamb-nas-oresje.jpg";
import { localeHref } from "@/lib/locales";

const MotionImage = motion.create(Image);

const HeroSection = ({ locale, content }) => {
  // Transform-only animations: elements stay visible (opacity 1) in the
  // server-rendered HTML so the hero paints before hydration (LCP), then
  // slide/scale into place once framer-motion takes over.
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Header content animation variants
  const headerVariants = {
    hidden: { y: 30 },
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  // Card animation variants
  const cardVariants = {
    hidden: { y: 60, scale: 0.95 },
    visible: {
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  // Card image animation variants
  const imageVariants = {
    hidden: { scale: 1.1 },
    visible: {
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  // Card title animation variants
  const titleVariants = {
    hidden: { y: 20 },
    visible: {
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  return (
    <motion.main
      className="flex flex-col items-center justify-center w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header section with title and subtitle */}
      <motion.div
        className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full pt-32 sm:pt-32 md:pt-32 lg:pt-36 pb-8 lg:pb-12"
        variants={headerVariants}
      >
        <motion.p
          className="text-[11px] tracking-[0.14em] uppercase text-muted mb-6"
          variants={headerVariants}
        >
          {locale === "hr"
            ? "Stambena gradnja — Zagreb i Jadran"
            : "Residential development — Zagreb & the Adriatic"}
        </motion.p>
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-12">
          <motion.h1
            className="font-display font-semibold text-[38px] sm:text-[48px] md:text-[58px] lg:text-[68px] xl:text-[76px] max-w-full lg:max-w-[860px] text-balance leading-[0.98] tracking-[-0.02em] order-1"
            variants={headerVariants}
          >
            {content?.heroTitle}
          </motion.h1>
          <motion.p
            className="text-sm sm:text-[15px] leading-relaxed max-w-full lg:max-w-[380px] text-light-gray order-2 lg:mb-2"
            variants={headerVariants}
          >
            {content?.heroSubtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Image cards section */}
      <motion.div
        className="flex flex-col lg:flex-row items-start justify-between w-full h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 gap-4 sm:gap-6 lg:gap-8 pb-8 sm:pb-12 lg:pb-16"
        variants={containerVariants}
      >
        {/* Trogir card */}
        <Link href={localeHref(locale, "/in-plan/trogir-centar")} className="block w-full">
        <motion.div className="group w-full" variants={cardVariants}>
          <div className="relative overflow-hidden rounded-[12px] sm:rounded-[14px] w-full h-[300px] sm:h-[400px] lg:h-[460px] bg-card-bg">
            <MotionImage
              src={trogir}
              alt="Trogir - Centar"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
              variants={imageVariants}
            />
          </div>
          <motion.div
            className="flex items-baseline justify-between gap-4 pt-4 px-1"
            variants={titleVariants}
          >
            <p className="font-display font-semibold text-[19px] sm:text-[21px] tracking-[-0.01em] group-hover:underline underline-offset-4 decoration-cta-color decoration-[1.5px]">
              Trogir - Centar
            </p>
            <span className="text-[12px] tracking-[0.1em] uppercase text-muted whitespace-nowrap">
              {locale === "hr" ? "Trogir · U planu" : "Trogir · In plan"}
            </span>
          </motion.div>
        </motion.div>
        </Link>

        {/* Borovje card */}
        <Link href={localeHref(locale, "/in-construction/stambeno-naselje-oresje")} className="block w-full">
        <motion.div className="group w-full" variants={cardVariants}>
          <div className="relative overflow-hidden rounded-[12px] sm:rounded-[14px] w-full h-[300px] sm:h-[400px] lg:h-[460px] bg-card-bg">
            <MotionImage
              src={borovje}
              alt="Stambeno Naselje Orešje"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
              variants={imageVariants}
            />
          </div>
          <motion.div
            className="flex items-baseline justify-between gap-4 pt-4 px-1"
            variants={titleVariants}
          >
            <p className="font-display font-semibold text-[19px] sm:text-[21px] tracking-[-0.01em] group-hover:underline underline-offset-4 decoration-cta-color decoration-[1.5px]">
              Stambeno Naselje Orešje
            </p>
            <span className="text-[12px] tracking-[0.1em] uppercase text-muted whitespace-nowrap">
              {locale === "hr" ? "Sveta Nedelja · U izgradnji" : "Sveta Nedelja · In construction"}
            </span>
          </motion.div>
        </motion.div>
        </Link>
      </motion.div>
    </motion.main>
  );
};

export default HeroSection;
