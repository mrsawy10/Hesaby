import React from "react";
import ContactForm from "./_components/contactForm";
import prisma from "@/prisma/db";
import { getDataImages } from "@/lib/utils";

async function PageContact() {
  const aboutData = await prisma.siteData.findMany({
    where: {
      identifier: {
        startsWith: "contact",
      },
    },
  });
  let data = await getDataImages(aboutData);
  return (
    <div className="container  pt-20">
      <ContactForm contactData={data} />
    </div>
  );
}

export default PageContact;
