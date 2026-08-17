"use client";

import { useState } from "react";
import { toStrapiLocale } from "@/lib/locales";
import { submitHomepageForm } from "@/app/actions/contact";

export default function ContactForm({ locale }) {
  const strapiLocale = toStrapiLocale(locale);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    location: "",
    type: "",
    budget: "",
    squareM: "",
    additional: "",
  });
  const [status, setStatus] = useState("");

  // Localization content
  const content = {
    "hr-HR": {
      nameLabel: "Ime i prezime",
      namePlaceholder: "Vaše ime i prezime",
      phoneLabel: "Broj Telefona",
      phonePlaceholder: "Vaš broj telefona",
      emailLabel: "Email",
      emailPlaceholder: "Vaš email",
      locationLabel: "Lokacija",
      locationPlaceholder: "Grad / regija",
      typeLabel: "Tip Nekretnine",
      typePlaceholder: "Stan, kuća, villa...",
      budgetLabel: "Budžet",
      budgetPlaceholder: "€",
      squareMLabel: "Kvadratura",
      squareMPlaceholder: "m²",
      additionalLabel: "Dodatne želje",
      additionalPlaceholder: "Vaša poruka",
      submitButton: "Pošalji",
      sending: "Šalje se...",
      successMessage: "✅ Poruka je uspješno poslana!",
      errorMessage: "❌ Slanje poruke nije uspjelo.",
      generalError: "⚠️ Nešto je pošlo po zlu."
    },
    "en": {
      nameLabel: "Full Name",
      namePlaceholder: "Your full name",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Your phone number",
      emailLabel: "Email",
      emailPlaceholder: "Your email address",
      locationLabel: "Location",
      locationPlaceholder: "City / region",
      typeLabel: "Property Type",
      typePlaceholder: "Apartment, house, villa...",
      budgetLabel: "Budget",
      budgetPlaceholder: "€",
      squareMLabel: "Square Meters",
      squareMPlaceholder: "m²",
      additionalLabel: "Additional Wishes",
      additionalPlaceholder: "Your message",
      submitButton: "Send",
      sending: "Sending...",
      successMessage: "✅ Message sent successfully!",
      errorMessage: "❌ Failed to send message.",
      generalError: "⚠️ Something went wrong."
    }
  };

  const t = content[strapiLocale] || content["hr-HR"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(t.sending);

    try {
      const res = await submitHomepageForm(formData);

      if (res.ok) {
        setStatus(t.successMessage);
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          location: "",
          type: "",
          budget: "",
          squareM: "",
          additional: "",
        });
        // Clear status after 3 seconds
        setTimeout(() => {
          setStatus("");
        }, 3000);
      } else {
        setStatus(t.errorMessage);
        // Clear status after 3 seconds
        setTimeout(() => {
          setStatus("");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus(t.generalError);
      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-none">
      <div className="space-y-3 sm:space-y-4">
        <div>
          <p className="font-normal uppercase text-xs text-white mb-1 sm:mb-2">{t.nameLabel}</p>
          <input
            type="text"
            name="name"
            placeholder={t.namePlaceholder}
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 sm:px-6 py-2 text-white border-1 border-dark-text/10 bg-gray h-[40px] sm:h-[43px] rounded-[8px] sm:rounded-[10px] text-sm sm:text-base"
          />
        </div>

        <div>
          <p className="font-normal uppercase text-xs text-white mb-1 sm:mb-2">{t.phoneLabel}</p>
          <input
            type="tel"
            name="phoneNumber"
            placeholder={t.phonePlaceholder}
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-4 sm:px-6 py-2 text-white border-1 border-dark-text/10 bg-gray h-[40px] sm:h-[43px] rounded-[8px] sm:rounded-[10px] text-sm sm:text-base"
          />
        </div>

        <div>
          <p className="font-normal uppercase text-xs text-white mb-1 sm:mb-2">{t.emailLabel}</p>
          <input
            type="email"
            name="email"
            placeholder={t.emailPlaceholder}
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 sm:px-6 py-2 text-white border-1 border-dark-text/10 bg-gray h-[40px] sm:h-[43px] rounded-[8px] sm:rounded-[10px] text-sm sm:text-base"
          />
        </div>

        <div>
          <p className="font-normal uppercase text-xs text-white mb-1 sm:mb-2">{t.locationLabel}</p>
          <input
            type="text"
            name="location"
            placeholder={t.locationPlaceholder}
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 sm:px-6 py-2 text-white border-1 border-dark-text/10 bg-gray h-[40px] sm:h-[43px] rounded-[8px] sm:rounded-[10px] text-sm sm:text-base"
          />
        </div>

        <div>
          <p className="font-normal uppercase text-xs text-white mb-1 sm:mb-2">{t.typeLabel}</p>
          <input
            type="text"
            name="type"
            placeholder={t.typePlaceholder}
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-4 sm:px-6 py-2 text-white border-1 border-dark-text/10 bg-gray h-[40px] sm:h-[43px] rounded-[8px] sm:rounded-[10px] text-sm sm:text-base"
          />
        </div>

        <div>
          <p className="font-normal uppercase text-xs text-white mb-1 sm:mb-2">{t.budgetLabel}</p>
          <input
            type="text"
            name="budget"
            placeholder={t.budgetPlaceholder}
            value={formData.budget}
            onChange={handleChange}
            required
            className="w-full px-4 sm:px-6 py-2 text-white border-1 border-dark-text/10 bg-gray h-[40px] sm:h-[43px] rounded-[8px] sm:rounded-[10px] text-sm sm:text-base"
          />
        </div>

        <div>
          <p className="font-normal uppercase text-xs text-white mb-1 sm:mb-2">{t.squareMLabel}</p>
          <input
            type="text"
            name="squareM"
            placeholder={t.squareMPlaceholder}
            value={formData.squareM}
            onChange={handleChange}
            required
            className="w-full px-4 sm:px-6 py-2 text-white border-1 border-dark-text/10 bg-gray h-[40px] sm:h-[43px] rounded-[8px] sm:rounded-[10px] text-sm sm:text-base"
          />
        </div>

        <div>
          <p className="font-normal uppercase text-xs text-white mb-1 sm:mb-2">{t.additionalLabel}</p>
          <textarea
            name="additional"
            placeholder={t.additionalPlaceholder}
            value={formData.additional}
            onChange={handleChange}
            required
            className="w-full px-4 sm:px-6 py-2 text-white border-1 border-dark-text/10 bg-gray rounded-[8px] sm:rounded-[10px] h-24 sm:h-32 text-sm sm:text-base resize-none"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === t.sending}
        className="bg-white text-ink hover:bg-cta-color hover:text-white px-4 py-2 w-full rounded-full h-[42px] sm:h-[46px] mt-6 sm:mt-8 font-medium text-sm sm:text-base transition-colors duration-200 disabled:opacity-70"
      >
        {status === t.sending ? t.sending : t.submitButton}
      </button>

      {status && (
        <p className="text-center text-white mt-3 sm:mt-4 text-sm sm:text-base">
          {status}
        </p>
      )}
    </form>
  );
}
