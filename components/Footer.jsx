import Link from "next/link";
import Image from "next/image";
import DiPlanLogo from "./DiPlanLogo";
import { ROUTES } from "@/lib/routes";
import { localeHref, toStrapiLocale } from "@/lib/locales";
import whereWeWork from "@/assets/images/whereWeOperate.webp";

const Footer = ({ locale }) => {
  const strapiLocale = toStrapiLocale(locale);

  const menuItems = [
    { key: "home", route: ROUTES.HOME },
    { key: "inConstruction", route: ROUTES.IN_CONSTRUCTION },
    { key: "projects", route: ROUTES.IN_PLAN },
    { key: "about", route: ROUTES.ABOUT_US },
  ];

  const menuLabels = {
    "hr-HR": {
      menu: "Menu",
      home: "Naslovna",
      inConstruction: "U Izgradnji",
      projects: "U planu",
      about: "O nama",
      contact: "Kontakt",
      contactUs: "Kontaktiraj nas",
      bookCall: "Nazovi nas",
      socialMedia: "Društvene mreže",
    },
    en: {
      menu: "Menu",
      home: "Home",
      inConstruction: "In Construction",
      projects: "In Plan",
      about: "About Us",
      contact: "Contact",
      contactUs: "Contact Us",
      bookCall: "Book a call",
      socialMedia: "Social Media",
    },
  };

  const socialLinks = [
    { name: "LinkedIn", url: "#" },
    { name: "Instagram", url: "#" },
    { name: "Facebook", url: "#" },
    { name: "Twitter", url: "#" },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1400px] w-full drop-shadow-xl">
        {/* Footer content */}
        <div className="bg-card-bg rounded-t-[40px] sm:rounded-t-[60px] lg:rounded-t-[80px]">
          {/* Top section with columns */}
          <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">

              {/* Logo */}
              <div className="sm:col-span-2 lg:col-span-1 flex justify-center sm:justify-start">
                <DiPlanLogo
                  color={"black"}
                  width={120}
                  height={38}
                />
              </div>

              {/* Menu */}
              <div className="flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
                <h3 className="text-black font-bold text-base sm:text-lg">
                  {menuLabels[strapiLocale]?.menu || "Menu"}
                </h3>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {menuItems.map((item) => (
                    <Link
                      key={item.key}
                      href={localeHref(locale, item.route)}
                      className="text-black/70 hover:text-black font-medium transition-colors text-sm sm:text-base"
                    >
                      {menuLabels[strapiLocale]?.[item.key] || item.key}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
                <h3 className="text-black font-bold text-base sm:text-lg">
                  {menuLabels[strapiLocale]?.contact || "Contact"}
                </h3>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <Link
                    href={localeHref(locale, ROUTES.CONTACT)}
                    className="text-black/70 hover:text-black font-medium transition-colors text-sm sm:text-base"
                  >
                    {menuLabels[strapiLocale]?.contactUs || "Contact Us"}
                  </Link>
                  <a
                    href="tel:+385994339499"
                    className="text-black/70 hover:text-black font-medium transition-colors text-sm sm:text-base"
                  >
                    {menuLabels[strapiLocale]?.bookCall || "Book a call"}
                  </a>
                  <a
                    href="mailto:info@elitprojekt.com"
                    className="text-black/70 hover:text-black font-medium transition-colors text-sm sm:text-base break-all sm:break-normal"
                  >
                    info@elitprojekt.com
                  </a>
                  <a
                    href="tel:+385994339499"
                    className="text-black/70 hover:text-black font-medium transition-colors text-sm sm:text-base"
                  >
                    +385 99 4339 499
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex flex-col gap-3 sm:gap-4 text-center sm:text-left">
                <h3 className="text-black font-bold text-base sm:text-lg">
                  {menuLabels[strapiLocale]?.socialMedia || "Social Media"}
                </h3>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="text-black/70 hover:text-black font-medium transition-colors text-sm sm:text-base"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="sm:col-span-2 lg:col-span-1 flex justify-center">
                <div className="w-full max-w-[280px] sm:max-w-none h-32 sm:h-40 lg:h-48 rounded-lg overflow-hidden">
                  <Image
                    src={whereWeWork}
                    alt="Where we work - Elit Projekt location"
                    className="w-full h-full object-cover"
                    sizes="280px"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Big ELIT PROJEKT text */}
          <div className="overflow-hidden px-2">
            <h1 className="text-[60px] sm:text-[100px] md:text-[120px] lg:text-[150px] xl:text-[180px] font-black text-black leading-none text-center select-none">
              ELIT PROJEKT
            </h1>
          </div>

          {/* Bottom section */}
          <div className="border-t border-black/10 px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <p className="text-black/60 text-xs sm:text-sm text-center sm:text-left">
                © 2025 ELIT PROJEKT D.O.O. ALL RIGHTS RESERVED
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
                <a href="#" className="text-black/60 hover:text-black text-xs sm:text-sm transition-colors">
                  COOKIES
                </a>
                <span className="text-black/40 hidden sm:inline">|</span>
                <a href="#" className="text-black/60 hover:text-black text-xs sm:text-sm transition-colors">
                  TERMS AND CONDITIONS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
