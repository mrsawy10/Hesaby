import { getSingleUrl } from "@/lib/backend/getImageUrl";
import prisma from "@/prisma/db";
import React from "react";
import Main from "../_components/main";

async function Page() {
  let siteData = await prisma.siteData.findMany();

  const structure = [
    { element: `label`, text: `First Section` },
    {
      element: `input`,
      title: `Title`,
      name: `about_sec1_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec1_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `about_sec1_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec1_desc`)?.value,
    },
    {
      element: `input`,
      title: `Image`,
      name: `about_sec1_img`,
      type: `file`,
      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `about_sec1_img`)?.value,
      }),
    },
    { element: `label`, text: `block 1` },
    {
      element: `input`,
      title: `Number`,
      name: `about_sec1_block1_number`,
      type: `text`,
      className: `lg:w-4/12 `,
      defaultValue: siteData.find((d) => d.identifier == `about_sec1_block1_number`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      className: `lg:w-4/12 `,

      name: `about_sec1_block1_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec1_block1_desc`)?.value,
    },

    { element: `label`, text: `block 2` },
    {
      element: `input`,
      title: `Number`,
      name: `about_sec1_block2_number`,
      type: `text`,
      className: `lg:w-4/12 `,

      defaultValue: siteData.find((d) => d.identifier == `about_sec1_block2_number`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `about_sec1_block2_desc`,
      type: `text`,
      className: `lg:w-4/12 `,

      defaultValue: siteData.find((d) => d.identifier == `about_sec1_block2_desc`)?.value,
    },

    {
      element: `label`,
      text: `block 3`,
    },
    {
      element: `input`,
      title: `Number`,
      className: `lg:w-4/12 `,

      name: `about_sec1_block3_number`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec1_block3_number`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      className: `lg:w-4/12 `,

      name: `about_sec1_block3_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec1_block3_desc`)?.value,
    },

    {
      element: `label`,
      text: `block 4`,
    },
    {
      element: `input`,
      title: `Number`,
      className: `lg:w-4/12 `,

      name: `about_sec1_block4_number`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec1_block4_number`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      className: `lg:w-4/12 `,

      name: `about_sec1_block4_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec1_block4_desc`)?.value,
    },

    { element: `hr` },
    { element: `hr` },

    { element: `label`, text: `Second Section` },
    {
      element: `input`,
      title: `Title`,
      name: `about_sec2_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec2_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `about_sec2_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec2_desc`)?.value,
    },
    {
      element: `input`,
      title: `Image`,
      name: `about_sec2_img`,
      type: `file`,
      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `about_sec2_img`)?.value,
      }),
    },

    //
    {
      element: `label`,
      text: `Block 1`,
    },

    {
      element: `input`,
      title: `Title`,
      name: `about_sec2_block1_title`,
      type: `text`,
      className: `lg:w-4/12 `,

      defaultValue: siteData.find((d) => d.identifier == `about_sec2_block1_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `about_sec2_block1_desc`,
      type: `text`,
      className: `lg:w-4/12 `,

      defaultValue: siteData.find((d) => d.identifier == `about_sec2_block1_desc`)?.value,
    },
    {
      element: `input`,
      title: `Image`,
      name: `about_sec2_block1_img`,
      type: `file`,
      fileContainerClassName: `lg:w-6/12 `,

      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `about_sec2_block1_img`)?.value,
      }),
    },

    {
      element: `label`,
      text: `Block 2`,
    },
    {
      className: `lg:w-4/12 `,
      element: `input`,
      title: `Title`,
      name: `about_sec2_block2_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec2_block2_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      className: `lg:w-4/12 `,
      name: `about_sec2_block2_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec2_block2_desc`)?.value,
    },

    {
      element: `input`,
      title: `Image`,
      name: `about_sec2_block2_img`,
      type: `file`,
      fileContainerClassName: `lg:w-6/12 `,

      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `about_sec2_block2_img`)?.value,
      }),
    },
    {
      element: `label`,
      text: `Block 3`,
    },
    {
      element: `input`,
      title: `Title`,
      name: `about_sec2_block3_title`,
      type: `text`,
      className: `lg:w-4/12 `,

      defaultValue: siteData.find((d) => d.identifier == `about_sec2_block3_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `about_sec2_block3_desc`,

      type: `text`,
      className: `lg:w-4/12 `,

      defaultValue: siteData.find((d) => d.identifier == `about_sec2_block3_desc`)?.value,
    },

    {
      element: `input`,
      title: `Image`,
      name: `about_sec2_block3_img`,
      type: `file`,
      fileContainerClassName: `lg:w-6/12 `,

      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `about_sec2_block3_img`)?.value,
      }),
    },
    {
      element: `label`,
      text: `Block 4`,
    },
    {
      element: `input`,
      className: `lg:w-4/12 `,

      title: `Title`,
      name: `about_sec2_block4_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `about_sec2_block4_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `about_sec2_block4_desc`,
      type: `text`,
      className: `lg:w-4/12 `,

      defaultValue: siteData.find((d) => d.identifier == `about_sec2_block4_desc`)?.value,
    },
    {
      element: `input`,
      title: `Image`,
      name: `about_sec2_block4_img`,
      type: `file`,
      fileContainerClassName: `lg:w-6/12 `,

      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `about_sec2_block4_img`)?.value,
      }),
    },
  ];
  return (
    <div>
      {/* test */}
      <Main pageTitle={`Edit About us Page`} structure={structure} />
    </div>
  );
}

export default Page;
