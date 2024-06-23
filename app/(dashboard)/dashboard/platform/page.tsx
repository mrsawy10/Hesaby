// import React from 'react';
import { Platforms as PlatformsComponent } from "./components/platforms";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import prisma from "@/prisma/db";
import s3 from "@/s3";

export const dynamic = "force-dynamic";


const MainPlatformComponent = async () => {
  const platforms = await prisma.platform.findMany();

  platforms.forEach(async (platform) => {
    let command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: platform.platformImg as string,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
    platform.platformImg = url;
  });

  return <PlatformsComponent tableData={platforms} />;
};

export default MainPlatformComponent;
