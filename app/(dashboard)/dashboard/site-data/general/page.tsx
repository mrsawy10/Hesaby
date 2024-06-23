import { getSingleUrl } from "@/lib/backend/getImageUrl";
import prisma from "@/prisma/db";
import React from "react";
import Main from "../_components/main";

async function Page() {
  let siteData = await prisma.siteData.findMany();

  const structure = [
    { element: `label`, text: `Logo` },
    
      element: `input`,
      title: `Logo Image`,
      name: `general_logo_img`,
      type: `file`,
      defaultValue: await getSingleUrl({
        key: siteData.find((d) => d.identifier == `general_logo_img`)?.value,
      }),
    },
    { element: `hr` },

    { element: `label`, text: `Admin Main Email (Responsible for receiving messages)` },
    {
      element: `input`
      title: `admin email`,
      name: `general_admin_email`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `general_admin_email`)?.value,
    },
    { element: `label`, text: `Main phone` },
    {
      element: `input`,
      title: `Main phone`,
      name: `general_main_phone`,
      type: `text`,
      defaultValue: siteDta.find((d) => d.identifier == `general_main_phone`)?.value,
    },
    { element: `hr` },

    { element: `label`, text: `Tax (Gets calculated as a fixed)` },
    {
      element: `input`,
      title: `Tax`,
      name: `general_tax`,
      type: `text`,
      defaultValue: siteDaa.find((d) => d.identifier == `general_tax`)?.value,
    },

    { element: `label`, text: `Currency` },
    {
      element: `input`,
      title: `Currency`,
      name: `general_currency`,
      type: `text`,
      defaultValue: siteDat.find((d) => d.identifier == `general_currency`)?.value,
    },
    { element: `hr` },

    { element: `label`, text: `Sell Alert` },
    {
      element: `input`,
      title: `Sell Alert`,
      name: `general_sell_alert_content`,
      type: `editor`,
      defaultValue: siteData.find((d) => d.identifier == `general_sell_alert_content`)?.value,
    },
    { element: `label`, text: `Buy Alert` },
    {
      element: `input`,
      title: `Buy Alert`,
      name: `general_buy_alert_content`,
      type: `editor`,
      defaultValue: siteDatafind((d) => d.identifier == `general_buy_alert_content`)?.value,
    },

    { element: `hr` },

    { element: `label`, text: `Twitter` },
    {
      element: `input`,
      title: `Twitter`,
      name: `general_twitter`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `general_twitter`)?.value,
    },
    { element: `label`, text: `Facebook` },
    {
      element: `input`,
      title: `Facebook`,
      name: `general_facebook`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `general_facebook`)?.value,
    },
    { element: `label`, text: `WhatsApp` },
    {
      element: `input`,
      title: `WhatsApp`,
      name: `general_whatsapp`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `general_whatsapp`)?.value,
    },
    { element: `label`, text: `Instagram` },
    {
      element: `input`,
      title: `Instagram`,
      name: `general_instagram`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `general_instagram`)?.value,
    },
    { element: `label`, text: `TikTok` },
    {
      element: `input`,
      title: `TikTok`,
      name: `general_tiktok`,
      type: `text`,
      defaultValue: siteData.find((d) => d.identifier == `general_tiktok`)?.value,
    },
    // currency instgram tiktok twitter facebook
  ];
  return (
    <div>
      <Main pageTitle={`Edit general Page`} structure={structure} />
    </div>
  );
}

export default Page;
