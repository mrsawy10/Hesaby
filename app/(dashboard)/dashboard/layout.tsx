import type { Metadata } from "next";
import { Providers } from "./providers";
import { Layout } from "@/components/layout/layout";
import { getSiteDataImgUrl } from "@/lib/backend/getImageUrl";

import "filepond/dist/filepond.min.css";
import "yet-another-react-lightbox/styles.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import "@/styles/dashboard.css";
import prisma from "@/prisma/db";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Hesaby Dashboard",
};

export const dynamic = "force-dynamic";
export const revalidate = 20;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let siteData = await prisma.siteData.findMany();
  let data = await getSiteDataImgUrl(siteData);
  return (
    <div dir="ltr">
      <Providers siteData={data}>
        <Layout>{children}</Layout>
      </Providers>
    </div>
  );
}
