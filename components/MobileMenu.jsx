"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { localeHref, toStrapiLocale } from "@/lib/locales";

const menuVars = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.12, 0, 0.39, 0],
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const containerVars = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const MobileMenu = ({ locale, closeMenu }) => {
  const isHr = toStrapiLocale(locale) === "hr-HR";

  const navLinks = [
    { title: isHr ? "Naslovna" : "Home", href: ROUTES.HOME },
    { title: isHr ? "U Izgradnji" : "In Construction", href: ROUTES.IN_CONSTRUCTION },
    { title: isHr ? "U Planu" : "In Plan", href: ROUTES.IN_PLAN },
    { title: isHr ? "O nama" : "About Us", href: ROUTES.ABOUT_US },
    { title: isHr ? "Kontakt" : "Contact", href: ROUTES.CONTACT },
  ];

  return (
    <motion.div
      variants={menuVars}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ zIndex: 9999 }}
      className="fixed left-0 bottom-0 h-[70%] w-full rounded-t-[40px] header-box origin-bottom dark:bg-background p-10 padding-x py-6 z-100"
    >
      <div className="flex h-full flex-col">
        <div className="flex justify-between"></div>
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="open"
          exit="initial"
          className="flex flex-col h-full justify-center font-clashdisplay items-center gap-4 "
        >
          {navLinks.map((link, index) => (
            <div key={index} className="overflow-hidden">
              <MobileNavLink
                title={link.title}
                href={localeHref(locale, link.href)}
                closeMobMenu={closeMenu}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;

const MobileNavLink = ({ title, href, closeMobMenu }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="md:text-8xl text-3xl uppercase text-white font-medium"
    >
      <Link onClick={closeMobMenu} href={href}>
        {title}
      </Link>
    </motion.div>
  );
};

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};
