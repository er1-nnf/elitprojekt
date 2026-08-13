"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import NavBar from "./NavBar";
import MobileMenu from "./MobileMenu";

export default function Header({ locale }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <NavBar locale={locale} isOpen={isOpen} setOpen={setOpen} />
      <AnimatePresence>
        {isOpen && (
          <MobileMenu locale={locale} closeMenu={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
