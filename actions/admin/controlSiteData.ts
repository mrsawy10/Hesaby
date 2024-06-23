"use server";

import { Prisma as PrismaType } from "@prisma/client";
import { prisma } from "@/prisma/db";
import handleUploadFilesS3 from "@/lib/backend/s3Upload";
import handleDeleteFileS3 from "@/lib/backend/s3Delete";

export default async function controlSiteData(formData: FormData) {
  // 获取当前时间，
  const formDataObject = Object.fromEntries(formData.entries());

  for (let key in formDataObject) {
    let keyValue = formDataObject[key];
    if (typeof keyValue == `string`) {
      await prisma.siteData.upsert({
        where: { identifier: key },
        update: { value: keyValue as string },
        create: { identifier: key, value: keyValue },
      });
    } else if (keyValue instanceof File) {
      let bytes = await keyValue.arrayBuffer();
      let buffer = Buffer.from(bytes);
      let oldEntry = await prisma.siteData.findUnique({ where: { identifier: key } });
      await handleDeleteFileS3({ key: `${oldEntry?.value}` });
      let { name, ok } = await handleUploadFilesS3({
        buffer,
        filename: keyValue.name || "",
        tableName: "siteData",
        identifier: key,
      });
      if (!ok || !name) {
        throw new Error("Please upload a valid image");
      }
      await prisma.siteData.upsert({
        where: { identifier: key },
        update: { value: name },
        create: { identifier: key, value: name },
      });
      console.log({ key, keyValue });
    }
  }

  return true;
}
