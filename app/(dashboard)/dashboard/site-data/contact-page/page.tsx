import { getSingleUrl } from "@/lib/backend/getImageUrl";
import prisma from "@/prisma/db";
import React from "react";
import Main from "../_components/main";

async function Page() {
  let siteData = await prisma.siteData.findMany();

  const structure = [
    { element: `label`, text: `Contact Form ` },
    {
      element: `input`,
      title: `Title`,
      name: `contact_sec1_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `contact_sec1_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `contact_sec1_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `contact_sec1_desc`)?.value,
    },
  ];
  return (
    <div>
      <Main pageTitle={`Edit About us Page`} structure={structure} />
    </div>
  );
}

export default Page;
