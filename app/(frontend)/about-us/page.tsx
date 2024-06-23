import React from "react";
import { About } from "./_components/about";
import { Services } from "./_components/services";
import { FAQ } from "@/components/FAQ";
import prisma from "@/prisma/db";
import { getDataImages } from "@/lib/utils";

async function PageAbout() {
  const aboutData = await prisma.siteData.findMany({
    where: {
      identifier: {
        startsWith: "about",
      },
    },
  });
  let data = await getDataImages(aboutData);

  let faq = await prisma.faq.findMany();
  return (
    <div className="container">
      <About aboutData={data} />
      <Services aboutData={data} />
      <FAQ faq={faq} />
    </div>
  );
}

export default PageAbout;
