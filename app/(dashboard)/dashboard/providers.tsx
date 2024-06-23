"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import useThemeStore from "@/store/themeStore";
import { SiteData } from "@prisma/client";
import useGeneralStore from "@/store/generalStore";
// import { Layout } from "@/components/layout/layout";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  siteData?: SiteData[];
}

export function Providers({ children, themeProps, siteData }: ProvidersProps) {
  let { currentTheme } = useThemeStore();
  let { setSiteData } = useGeneralStore();
  React.useEffect(() => {
    siteData && setSiteData(siteData);
    useThemeStore.persist.rehydrate();
  }, []);
  // _________________
  React.useEffect(() => {
    if (currentTheme == `dark`) {
      document?.querySelector(`body`)?.classList.add(`dark`);
    } else {
      document?.querySelector(`body`)?.classList.remove(`dark`);
    }
  }, [currentTheme]);

  // ________________________________________
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
