"use server";

import bcrypt from "bcrypt";
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
// import { editGameAndPlatformSchema } from "@/lib/formSchemas";
import handleUploadFilesS3 from "@/lib/backend/s3Upload";
import handleDeleteFileS3 from "@/lib/backend/s3Delete";
// const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
import { editGameAndPlatformSchema, editUserSchema } from "@/lib/formSchemas";

export const editUser = async (userData: any, formData: FormData) => {
  let profileImg = Object.fromEntries(formData.entries()).profileImg,
    coverImg = Object.fromEntries(formData.entries()).coverImg;

  editUserSchema.validateSync({ ...userData, profileImg, coverImg });

  let updatedData: any = {
    firstName: userData.firstName as string,
    lastName: userData.lastName as string,
    bio: userData.bio as string,
    isBlocked: userData.isBlocked,
    isWithdrawRequested: userData.isWithdrawRequested,
    isEmailVerified: userData.isEmailVerified,
    isPhoneVerified: userData.isPhoneVerified,
    email: userData.email,
    iban: userData.iban,
    phoneNumber: userData.phoneNumber,
    card_holder_name: userData.card_holder_name,
    card_number: userData.card_number,
    profileImg,
    coverImg,
  };
  let existQuery: any = [{ email: updatedData.email }, { phoneNumber: updatedData.phoneNumber }];
  if (updatedData.iban) {
    existQuery.push({ iban: updatedData.iban });
  }
  let existingUsers = await prisma.user.findMany({
    where: {
      OR: existQuery,
    },
  });

  if (existingUsers.find((user) => user.id !== userData.id))
    throw new Error("(Email or phone number or iban) already exists");

  if (profileImg) {
    if (userData.profileImgKey) {
      let { ok } = await handleDeleteFileS3({ key: userData.profileImgKey as string });
      if (!ok) throw new Error("Error while deleting profile old image");
    }
    let bytes = await (profileImg as File).arrayBuffer();
    let buffer = Buffer.from(bytes);

    let { name, ok: uploadOk } = await handleUploadFilesS3({
      buffer,
      filename: (profileImg as File).name,
      tableName: "user",
      identifier: "profileImg",
    });
    if (!uploadOk) throw new Error("Error while uploading profile  image");
    updatedData.profileImg = name;
  }
  if (coverImg) {
    if (userData.coverImgKey) {
      let { ok } = await handleDeleteFileS3({ key: userData.coverImgKey as string });
      if (!ok) throw new Error("Error while deleting cover old image");
    }
    let bytes = await (coverImg as File).arrayBuffer();
    let buffer = Buffer.from(bytes);

    let { name, ok: uploadOk } = await handleUploadFilesS3({
      buffer,
      filename: (coverImg as File).name,
      tableName: "user",
      identifier: "coverImg",
    });
    if (!uploadOk) throw new Error("Error while uploading cover  image");
    updatedData.coverImg = name;
  }

  // _password
  if (userData.password) {
    // console.log(`ppppppassssssssssswwwwwordddddddddddd==========>`, userData.password);
    updatedData.password = await bcrypt.hash(
      userData.password,
      Number(process.env.ROUNDS_OF_HASHING) as number
    );
  }
  //

  let updatedUser = await prisma.user.update({
    where: { id: userData.id },
    data: updatedData,
  });
  return updatedUser;
};
