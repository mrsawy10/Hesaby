"use client";

import React, { useLayoutEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import arTranslations from "@/locales/ar.json";
import useGeneralStore from "@/store/generalStore";
import { SiteData } from "@prisma/client";

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: arTranslations,
    },
  },
  lng: "ar", // Set Arabic as the default language
  fallbackLng: "ar", // Fallback to Arabic if translation is missing
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

function Provider({ children, siteData }: { siteData: SiteData[]; children: React.ReactNode }) {
  let { setSiteData } = useGeneralStore();
  //
  useLayoutEffect(() => {
    setSiteData(siteData);
  }, []);

  //
  // console.log(dd);
  return <>{children}</>;
}

export default Provider;
