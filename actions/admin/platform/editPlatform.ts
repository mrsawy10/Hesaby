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
import { editGameAndPlatformSchema } from "@/lib/formSchemas";
import handleUploadFilesS3 from "@/lib/backend/s3Upload";
import handleDeleteFileS3 from "@/lib/backend/s3Delete";
// const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");

export const editPlatform = async (rawFormData: FormData, id: string) => {
  let { title, description, mainImage, platformImgName } = Object.fromEntries(rawFormData.entries());
  editGameAndPlatformSchema.validateSync({ title, description, image: mainImage });

  if (mainImage) {
    let bytes = await (mainImage as File).arrayBuffer();
    let buffer = Buffer.from(bytes);
    let { ok } = await handleDeleteFileS3({ key: platformImgName as string });
    if (!ok) throw new Error("Error while deleting old image");

    let { name, ok: uploadOk } = await handleUploadFilesS3({
      buffer,
      filename: (mainImage as File).name,
      tableName: "platform",
      identifier: "platformImg",
    });

    if (!uploadOk) throw new Error("Error while uploading Platform image");
    let updatedGame = await prisma.platform.update({
      where: { id },
      data: {
        title: title as string,
        description: description as string,
        platformImg: name,
      },
    });
    return updatedGame;
  }
  let updated = await prisma.platform.update({
    where: { id },
    data: {
      title: title as string,
      description: description as string,
    },
  });
  return updated;

};
