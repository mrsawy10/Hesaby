"use server";

import { Prisma as PrismaType } from "@prisma/client";
import { prisma } from "@/prisma/db";
import TableName from "@/types/table-names";
// import { redirect } from "next/navigation";
// import { join } from "path";
import generateUniqueId from "@/lib/date_id";
// import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/s3";
// const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");

export const addNewAction = async (tableName: TableName, rawFormData: FormData) => {
  // revalidatePath
  const formData: { [key: string]: any } = {};
  for (const [key, value] of rawFormData.entries()) {
    if (rawFormData.get(key) instanceof File) {
      let { path } = await handleUploadFiles({
        file: rawFormData.get(key) as File | null,
        tableName,
        identifier: key,
      });
      // console.log(`path==> `, path);
      formData[key] = path;
      continue;
    }
    formData[key] = rawFormData.get(key);
  }
  let createdEntry;

  switch (tableName) {
    case "game":
      createdEntry = await prisma.game.create({
        data: formData as PrismaType.GameCreateInput,
      });

      break;
    case "platform":
      createdEntry = await prisma.platform.create({
        data: formData as PrismaType.PlatformCreateInput,
      });
      break;
    case "faq":
      createdEntry = await prisma.faq.create({
        data: formData as PrismaType.FaqCreateInput,
      });
      break;
    case "slide":
      createdEntry = await prisma.slide.create({
        data: formData as PrismaType.SlideCreateInput,
      });
      break;
    default:
      throw new Error(`Invalid table name: ${tableName}`);
  }
  // console.log(`createdEntry==>`, createdEntry);
  return createdEntry;
};
export const editAction = async (tableName: TableName, rawFormData: FormData, id: string) => {
  // revalidatePath
  const formData: { [key: string]: any } = {};
  for (const [key, value] of rawFormData.entries()) {
    if (rawFormData.get(key) instanceof File) {
      const file = rawFormData.get(key) as File; // Cast to File type
      //
      if (!file.type.includes(`image/`)) throw new Error(`Invalid File Type`);
      if (file.size >= 10 * 1024 * 1024) throw new Error(`File is Too large Type`);
      //

      let { path } = await handleUploadFiles({
        file: rawFormData.get(key) as File | null,
        tableName,
        identifier: key,
      });
      // console.log(`path==> `, path);
      formData[key] = path;
      continue;
    }
    formData[key] = rawFormData.get(key);
  }
  let createdEntry;

  switch (tableName) {
    case "game":
      createdEntry = await prisma.game.update({
        where: { id },
        data: formData as PrismaType.GameCreateInput,
      });

      break;
    case "platform":
      createdEntry = await prisma.platform.update({
        where: { id },
        data: formData as PrismaType.PlatformCreateInput,
      });
      break;
    default:
      throw new Error(`Invalid table name: ${tableName}`);
  }
  console.log(`createdEntry==>`, createdEntry);
  return revalidatePath(`/dashboard/platform`);
};

// description
async function handleUploadFiles({
  file,
  tableName,
  identifier,
}: {
  file: File | null;
  tableName: string;
  identifier: string;
}) {
  if (!file?.size) {
    throw new Error(`must upload valid image`);
  }
  console.log(`file=>`, file);
  const filename = `${tableName}_${identifier}_${generateUniqueId()}_${file.name.replaceAll(
    " ",
    "_"
  )}`;

  let bytes = await file.arrayBuffer();
  let buffer = Buffer.from(bytes);

  let command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: filename,
    Body: buffer,
  });
  await s3.send(command);
  return { path: filename };
}

export default addNewAction;
