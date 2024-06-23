import { getSingleUrl } from "@/lib/backend/getImageUrl";
import prisma from "@/prisma/db";
import React from "react";
import Main from "../_components/main";

async function Page() {
  let siteData = await prisma.siteData.findMany();

  const structure = [
    { element: `label`, text: `Second Section` },
    {
      element: `input`,
      title: `Title`,
      name: `home_sec2_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec2_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `home_sec2_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec2_desc`)?.value,
    },
    { element: `hr` },
    { element: `label`, text: `block 1` },
    {
      element: `input`,
      title: `Title`,
      name: `home_sec2_block1_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec2_block1_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `home_sec2_block1_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec2_block1_desc`)?.value,
    },
    {
      element: `input`,
      title: `Image`,
      name: `home_sec2_block1_img`,
      type: `file`,
      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `home_sec2_block1_img`)?.value,
      }),
    },
    { element: `hr` },
    { element: `label`, text: `block 2` },
    {
      element: `input`,
      title: `Title`,
      name: `home_sec2_block2_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec2_block2_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `home_sec2_block2_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec2_block2_desc`)?.value,
    },
    {
      element: `input`,
      title: `Image`,
      name: `home_sec2_block2_img`,
      type: `file`,
      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `home_sec2_block2_img`)?.value,
      }),
    },
    { element: `hr` },
    { element: `label`, text: `block 3` },
    {
      element: `input`,
      title: `Title`,
      name: `home_sec2_block3_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec2_block3_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `home_sec2_block3_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec2_block3_desc`)?.value,
    },
    {
      element: `input`,
      title: `Image`,
      name: `home_sec2_block3_img`,
      type: `file`,
      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `home_sec2_block3_img`)?.value,
      }),
    },
    { element: `label`, text: `block 4` },
    {
      element: `input`,
      title: `Title`,
      name: `home_sec2_block4_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec2_block4_title`)?.value,
    },
    {
      element: `input`,
      title: `Description`,
      name: `home_sec2_block4_desc`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec2_block4_desc`)?.value,
    },
    {
      element: `input`,
      title: `Image`,
      name: `home_sec2_block4_img`,
      type: `file`,
      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `home_sec2_block4_img`)?.value,
      }),
    },
    { element: `hr` },
    { element: `label`, text: `Section 3` },
    {
      element: `input`,
      title: `Title`,
      name: `home_sec3_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec3_title`)?.value,
    },
    { element: `hr` },
    { element: `label`, text: `Section 4` },
    {
      element: `input`,
      title: `Title`,
      name: `home_sec4_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec4_title`)?.value,
    },
    { element: `hr` },
    { element: `label`, text: `Section 5` },
    {
      element: `input`,
      title: `Title`,
      name: `home_sec5_title`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `home_sec5_title`)?.value,
    },
  ];
  return (
    <div>
      <Main pageTitle={`Edit Home Page`} structure={structure} />
    </div>
  );
}

export default Page;
