import localFont from "next/font/local";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";

import { LOCALES, URL_LOCALES } from "@/lib/locales";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import LenisProvider from "@/components/LenisProvider";

const inter = localFont({
  src: "../../assets/fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return URL_LOCALES.map((locale) => ({ locale }));
}

const META = {
  hr: {
    title: "Elit Projekt | Izgradnja i prodaja nekretnina",
    description:
      "Elit Projekt - izgradnja i prodaja stambenih nekretnina u Zagrebu i na Jadranu.",
  },
  en: {
    title: "Elit Projekt | Real Estate Development & Sales",
    description:
      "Elit Projekt - development and sale of residential real estate in Zagreb and on the Adriatic coast.",
  },
  de: {
    title: "Elit Projekt | Immobilienentwicklung & Verkauf",
    description:
      "Elit Projekt - Entwicklung und Verkauf von Wohnimmobilien in Zagreb und an der Adria.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const meta = META[locale] ?? META.hr;
  return {
    title: meta.title,
    description: meta.description,
    icons: { icon: "/favicon.svg" },
    alternates: {
      languages: Object.fromEntries(URL_LOCALES.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!URL_LOCALES.includes(locale)) notFound();

  const lang = LOCALES.find((l) => l.url === locale)?.lang ?? "hr";

  return (
    <html lang={lang}>
      <head>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans`}>
        <LenisProvider>
          <Header locale={locale} />
          <div className="bg-white" id="main-container">
            {children}
            <div className="-z-10">
              <Footer locale={locale} />
            </div>
          </div>
          <CookieBanner />
        </LenisProvider>
      </body>
    </html>
  );
}
