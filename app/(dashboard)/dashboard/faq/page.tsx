// import React from 'react';
import { Faq } from "./components/Faq";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import prisma from "@/prisma/db";
import s3 from "@/s3";

export const dynamic = "force-dynamic";

const FAQ = async () => {
  const faqs = await prisma.faq.findMany();
  // console.log(games);

  return <Faq tableData={faqs} />;
};

export default FAQ;
