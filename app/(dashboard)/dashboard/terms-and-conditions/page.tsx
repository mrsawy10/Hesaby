import { getSingleUrl } from "@/lib/backend/getImageUrl";
import prisma from "@/prisma/db";
import React from "react";
import Main from "@/app/(dashboard)/dashboard/site-data/_components/main";

async function Page() {
  let siteData = await prisma.siteData.findMany();

  const structure = [
    { element: `label`, text: `Page tiele` },
    {
      element: `input`,
      title: `Title`,
      name: `termsAndConditions_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `termsAndConditions_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `termsAndConditions_content`,
      type: `editor`,
      defaultValue: siteData.find((d) => d.identifier == `termsAndConditions_content`)?.value,
    },
    { element: `hr` },
  ];
  return (
    <div>
      <Main pageTitle={`Edit Terms and Conditions Page`} structure={structure} />
    </div>
  );
}

export default Page;
