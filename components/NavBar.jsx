"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Spiral as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";

import DiPlanLogo from "./DiPlanLogo";
import LocaleSwitcher from "./LocaleSwitcher";
import { ROUTES } from "@/lib/routes";
import { localeHref, toStrapiLocale } from "@/lib/locales";

const NavItem = ({ href, isActive, children }) => (
  <Link
    href={href}
    className={
      isActive
        ? "text-dark-text font-medium text-md transition-colors duration-200"
        : "text-light-gray font-normal text-md hover:text-dark-text transition-colors duration-200"
    }
  >
    {children}
  </Link>
);

const NavBar = ({ locale, isOpen, setOpen }) => {
  const pathname = usePathname();
  const strapiLocale = toStrapiLocale(locale);

  const isActive = (route) => {
    const href = localeHref(locale, route);
    return route === ROUTES.HOME ? pathname === href : pathname.startsWith(href);
  };

  return (
    <header
      style={{ zIndex: 999 }}
      className="fixed w-full flex justify-center px-4 lg:px-16 bg-white border-b border-hairline"
    >
      <motion.nav className="flex items-center justify-between w-full py-3">
        {/* Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-10 font-medium text-sm">
          <NavItem href={localeHref(locale, ROUTES.HOME)} isActive={isActive(ROUTES.HOME)}>
            {strapiLocale === "hr-HR" && "Naslovna"}
            {strapiLocale === "en" && "Home"}
            {strapiLocale === "de-DE" && "Startseite"}
          </NavItem>

          <NavItem
            href={localeHref(locale, ROUTES.IN_CONSTRUCTION)}
            isActive={isActive(ROUTES.IN_CONSTRUCTION)}
          >
            {strapiLocale === "hr-HR" && "U izgradnji"}
            {strapiLocale === "en" && "In Construction"}
            {strapiLocale === "de-DE" && "Im Bau"}
          </NavItem>

          <NavItem href={localeHref(locale, ROUTES.IN_PLAN)} isActive={isActive(ROUTES.IN_PLAN)}>
            {strapiLocale === "hr-HR" && "U Planu"}
            {strapiLocale === "en" && "In Plan"}
            {strapiLocale === "de-DE" && "In Planung"}
          </NavItem>

          <NavItem href={localeHref(locale, ROUTES.ABOUT_US)} isActive={isActive(ROUTES.ABOUT_US)}>
            {strapiLocale === "hr-HR" && "O nama"}
            {strapiLocale === "en" && "About us"}
            {strapiLocale === "de-DE" && "Über uns"}
          </NavItem>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <Link href={localeHref(locale, ROUTES.HOME)}>
            <DiPlanLogo width={152} height={48} color="black" />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4">
          <LocaleSwitcher locale={locale} />

          <NavItem
            href={localeHref(locale, ROUTES.CONTACT)}
            isActive={isActive(ROUTES.CONTACT)}
          >
            <span className="hidden lg:flex">
              {strapiLocale === "hr-HR" && "Kontakt"}
              {strapiLocale === "en" && "Contact"}
              {strapiLocale === "de-DE" && "Kontakt"}
            </span>
          </NavItem>

          <Link href={localeHref(locale, ROUTES.CONTACT)}>
            <button className="bg-ink text-white hover:bg-cta-color px-6 py-3 rounded-full text-sm font-medium xl:flex hidden transition-colors duration-200">
              {strapiLocale === "hr-HR" && "Želim nekretninu"}
              {strapiLocale === "en" && "I want a property"}
              {strapiLocale === "de-DE" && "Starte dein Projekt"}
            </button>
          </Link>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              direction="right"
              color={"#000000"}
            />
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default NavBar;
