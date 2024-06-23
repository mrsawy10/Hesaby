import React from "react";

import type { Metadata } from "next";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { Layout } from "@/components/layout/layout";
import "@/styles/globals.css";
import "@/styles/bootstrap.css";
import "sweetalert2/src/sweetalert2.scss";
// export const revalidate = 10;
// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Hesaby Dashboard",
// };

// import i18n from "@/components/lang-providor";


export const dynamic = "force-dynamic";
export const revalidate = 20;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar">
      <body dir="rtl" className={clsx("font-sans antialiased dark", fontSans.className)}>
        {children}
      </body>
    </html>
  );
}
