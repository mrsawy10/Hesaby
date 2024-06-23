// import React from 'react';
import { Slides } from "./components/slides";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import prisma from "@/prisma/db";
import s3 from "@/s3";

export const dynamic = "force-dynamic";

const Slide = async () => {
  const slides = await prisma.slide.findMany();
  // console.log(games);
  let data = await Promise.all(
    slides.map(async (slide) => {
      try {
        let command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: slide.image as string,
        });
        const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
        //
        let titleCommand = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: slide.titleImage as string,
        });
        const titleImageUrl = await getSignedUrl(s3, titleCommand, { expiresIn: 3600 * 24 });
        return { ...slide, titleImageUrl, imageUrl };
        // slide.titleImageUrl = titleUrl;
      } catch (err) {
        console.log(err);
      }
    })
  );
  console.log({ data });
  return <Slides tableData={data} />;
  // return <></>;
};

export default Slide;
