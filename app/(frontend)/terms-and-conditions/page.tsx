import React from "react";
// import ContactForm from "./_components/contactForm";
import prisma from "@/prisma/db";

async function PageContact() {
  const title = (
    await prisma.siteData.findUnique({
      where: {
        identifier: `termsAndConditions_title`,
      },
    })
  )?.value;
  const content = (
    await prisma.siteData.findUnique({
      where: {
        identifier: `termsAndConditions_content`,
      },
    })
  )?.value;
  return (
    <div className="container  pt-20">
      <section className="bg-white dark:bg-zinc-900 mb-12 rounded-md">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-16 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            {title}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: `${content}` }} />

          {/* {content} */}
        </div>
      </section>
    </div>
  );
}

export default PageContact;
