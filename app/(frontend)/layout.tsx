import FrontNav from "@/components/front-navbar/FrontNav";
import Head from "next/head";
import type { Metadata } from "next";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/footer";
import Provider from "@/components/Provider";
import prisma from "@/prisma/db";
import { getSiteDataImgUrl } from "@/lib/backend/getImageUrl";

export const metadata: Metadata = {
  title: "Hesaby",
  description: "Hesaby Platform",
};
// import "primereact/resources/themes/lara-light-cyan/theme.css";


export const dynamic = "force-dynamic";
export const revalidate = 20;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let siteData = await prisma.siteData.findMany();
  let data = await getSiteDataImgUrl(siteData);
  
  // console.log(data);
  return (
    <Provider siteData={data}>
      <div className="layout--font">
        <FrontNav />
        <div className="layout--container mt-9">{children}</div>
        <Footer />
        <ScrollToTop />
      </div>
    </Provider>
  );
}
