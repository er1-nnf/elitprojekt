"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LOCALES } from "@/lib/locales";

// Remember the choice so the proxy redirects bare URLs to this locale.
function rememberLocale(urlLocale) {
  document.cookie = `locale=${urlLocale};path=/;max-age=31536000`;
}

function LocaleSwitcher({ locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentLabel = LOCALES.find((l) => l.url === locale)?.label ?? "HR";

  const handleSelect = (urlLocale) => {
    setOpen(false);
    rememberLocale(urlLocale);
    const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
    router.push(`/${urlLocale}${rest}`);
  };

  return (
    <div style={{ zIndex: 9999 }} className="relative flex items-center">
      {/* Main circular button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 text-black font-medium flex items-center justify-center hover:scale-105 transition"
      >
        {currentLabel.toUpperCase()}
      </button>

      {/* Fan out locales */}
      <AnimatePresence>
        {open &&
          LOCALES.filter((l) => l.url !== locale).map((l, i) => (
            <motion.button
              key={l.url}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: (i + 1) * 60, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => handleSelect(l.url)}
              className="absolute right-0 w-12 h-12 rounded-full border-2 border-black text-black shadow-md flex items-center justify-center hover:bg-gray-100 bg-white"
              style={{ bottom: 0 }}
            >
              {l.label}
            </motion.button>
          ))}
      </AnimatePresence>
    </div>
  );
}

export default LocaleSwitcher;
