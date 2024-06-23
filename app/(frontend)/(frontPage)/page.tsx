import HeroSection from "./sections/HeroSection";
import MaskSection from "./sections/MaskSection";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { FAQ } from "@/components/FAQ";
import Featured from "./sections/featured";
import HowItWorks from "./sections/HowItWorks";
import { About } from "../about-us/_components/about";
import prisma from "@/prisma/db";
import { getDataImages } from "@/lib/utils";
import getImageUrl, { addImages } from "@/lib/backend/getImageUrl";

// getUrl

export const dynamic = "force-dynamic";
export const revalidate = 20;

async function page() {
  //  about data
  const aboutData = await prisma.siteData.findMany({
    where: {
      identifier: {
        startsWith: "about",
      },
    },
  });
  let about = await getDataImages(aboutData);

  //  slides data
  let slidesRaw = await prisma.slide.findMany({});
  let slides = await addImages({ data: slidesRaw, keys: ["image", "titleImage"] });
  //  Faq Data

  let faq = await prisma.faq.findMany({});

  return (
    <div>
      <HeroSection slides={slides} />
      {/* @ts-expect-error Server Component */}
      <HowItWorks />
      <About aboutData={about} />
      <hr className="mx-2 lg:mx-40 shadow-lg border-gray-500 dark:border-gray-600" />
      {/* @ts-expect-error Server Component */}
      <Featured />
      <hr className="mx-2 lg:mx-40 shadow-lg border-gray-500 dark:border-gray-600" />
      <FAQ faq={faq} />
    </div>
  );
}

export default page;
