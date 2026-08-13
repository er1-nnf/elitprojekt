"use client";

import { useState } from "react";
import { toStrapiLocale } from "@/lib/locales";
import { submitContactForm } from "@/app/actions/contact";
import LogoFooter from "@/components/DiPlanLogo";

export default function MiniContactForm({ locale }) {
  const strapiLocale = toStrapiLocale(locale);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
    from: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(strapiLocale === "hr-HR" ? "Šalje se..." : "Sending...");

    const formDataWithUrl = {
      ...formData,
      from: window.location.href
    };

    try {
      const res = await submitContactForm(formDataWithUrl);

      if (res.ok) {
        setStatus(strapiLocale === "hr-HR" ? "✅ Poruka je uspješno poslana!" : "✅ Message sent successfully!");
        setFormData({
          name: "",
          surname: "",
          email: "",
          message: "",
          from: "",
        });
        setTimeout(() => {
          setStatus("");
        }, 3000);
      } else {
        setStatus(strapiLocale === "hr-HR" ? "❌ Slanje poruke neuspješno." : "❌ Failed to send message.");
        setTimeout(() => {
          setStatus("");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus(strapiLocale === "hr-HR" ? "⚠️ Nešto je pošlo po zlu." : "⚠️ Something went wrong.");
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <LogoFooter color={"black"} width={160} height={50} />
      <p className="font-normal uppercase text-xs text-dark-text">
        {strapiLocale === "hr-HR" ? "Ime" : "Name"}
      </p>
      <input
        type="text"
        name="name"
        placeholder={strapiLocale === "hr-HR" ? "Vaše ime" : "Your name"}
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-6 py-2 text-dark-text border-1 border-dark-text/10 bg-white h-[43px] rounded-[10px] mb-4 mt-2"
      />

      <p className="font-normal uppercase text-xs text-dark-text">
        {strapiLocale === "hr-HR" ? "Prezime" : "Surname"}
      </p>
      <input
        type="text"
        name="surname"
        placeholder={strapiLocale === "hr-HR" ? "Vaše prezime" : "Your surname"}
        value={formData.surname}
        onChange={handleChange}
        required
        className="w-full px-6 py-2 text-dark-text border-1 border-dark-text/10 bg-white h-[43px] rounded-[10px] mb-4 mt-2"
      />

      <p className="font-normal uppercase text-xs text-dark-text">Email</p>
      <input
        type="email"
        name="email"
        placeholder={strapiLocale === "hr-HR" ? "Vaš email" : "Your email"}
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-6 py-2 text-dark-text border-1 border-dark-text/10 bg-white h-[43px] rounded-[10px] mb-4 mt-2"
      />

      <p className="font-normal uppercase text-xs text-dark-text">
        {strapiLocale === "hr-HR" ? "Poruka" : "Message"}
      </p>
      <textarea
        name="message"
        placeholder={strapiLocale === "hr-HR" ? "Vaša poruka" : "Your message"}
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full px-6 py-2 text-dark-text border-1 border-dark-text/10 bg-white rounded-[10px] h-32 mb-8 mt-2"
      ></textarea>

      <button
        type="submit"
        className="bg-dark-text text-white px-4 py-2 w-full rounded-[10px] h-[43px]"
      >
        {strapiLocale === "hr-HR" ? "Pošalji" : "Send"}
      </button>
      <p className="text-center text-dark-text">{status}</p>
    </form>
  );
}
