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
import { slideSchema } from "@/lib/formSchemas";
import handleUploadFilesS3 from "@/lib/backend/s3Upload";
import handleDeleteFileS3 from "@/lib/backend/s3Delete";
// const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");

export const editSlide = async (rawFormData: FormData, id: string) => {
  let { btnTxt, btnUrl, image, titleImage, imageName, titleImageName } = Object.fromEntries(
    rawFormData.entries()
  );
  slideSchema.validateSync({ btnTxt, btnUrl, image, titleImage });

  let updateData: any = {
    btnTxt,
    btnUrl,
  };

  if (image) {
    let bytes = await (image as File).arrayBuffer();
    let buffer = Buffer.from(bytes);
    let { ok } = await handleDeleteFileS3({ key: imageName as string });
    if (!ok) throw new Error("Error while deleting old image");

    let { name, ok: uploadOk } = await handleUploadFilesS3({
      buffer,
      filename: (image as File).name,
      tableName: "slide",
      identifier: "gSlideImg",
    });

    if (!uploadOk) throw new Error("Error while uploading Slide image");
    updateData.image = name;
  }
  if (titleImage) {
    let bytes = await (titleImage as File).arrayBuffer();
    let buffer = Buffer.from(bytes);
    let { ok } = await handleDeleteFileS3({ key: titleImageName as string });
    if (!ok) throw new Error("Error while deleting old image");

    let { name: titleImageNewName, ok: uploadOk } = await handleUploadFilesS3({
      buffer,
      filename: (titleImage as File).name,
      tableName: "slide",
      identifier: "slideTitleImg",
    });

    if (!uploadOk) throw new Error("Error while uploading Slide image");
    updateData.titleImage = titleImageNewName;
  }
  let updatedSlide = await prisma.slide.update({
    where: { id },
    data: updateData,
  });
  return updatedSlide;
};

export const deleteSlide = async (id: string) => {
  const slide = await prisma.slide.findUnique({
    where: { id },
    select: { image: true, titleImage: true },
  });

  if (!slide) {
    throw new Error("Slide not found");
  }

  // Delete images from S3 if they exist
  if (slide.image) {
    const { ok: imageDeleted } = await handleDeleteFileS3({ key: slide.image });
    if (!imageDeleted) throw new Error("Error while deleting slide image");
  }

  if (slide.titleImage) {
    const { ok: titleImageDeleted } = await handleDeleteFileS3({ key: slide.titleImage });
    if (!titleImageDeleted) throw new Error("Error while deleting slide title image");
  }

  // Delete the slide record from the database
  await prisma.slide.delete({
    where: { id },
  });
  return { message: "Slide deleted successfully" };
};
