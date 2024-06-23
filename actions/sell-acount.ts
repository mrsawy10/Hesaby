"use server";
import { accountSchema } from "@/lib/formSchemas";
import { cookies } from "next/headers";
import * as yup from "yup";
import bcrypt from "bcrypt";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose";
import handleUploadFilesS3 from "@/lib/backend/s3Upload";

export async function sellAccountAction(user: any, formData: FormData) {
  try {
    let gallery: any[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("gallery[")) {
        gallery.push(value);
      }
    }
    accountSchema.validateSync(
      { ...Object.fromEntries(formData.entries()), gallery },
      { abortEarly: false }
    );
    //
    // let { mainImage } = Object.fromEntries(formData.entries());
    let mainImage = formData.get("mainImage");

    console.log(mainImage);
    const newAccData = {
      title: formData.get("title") as string,
      email: formData.get("email") as string,
      description: formData.get("description") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      platform_id: formData.get("platform_id") as string,
      game_id: formData.get("game_id") as string,
      price: Number(formData.get("price")),
      status: `pending`,
      game_email: (formData.get("game_email") as string) ?? ``,
      game_password: (formData.get("game_password") as string) ?? ``,
    };

    if (!(mainImage instanceof File)) {
      throw new Error("Please upload an image");
    }

    let bytes = await mainImage?.arrayBuffer();
    let buffer = Buffer.from(bytes);
    let { name, ok } = await handleUploadFilesS3({
      buffer,
      filename: `${mainImage?.name ?? ``}`,
      tableName: `account`,
      identifier: `mainImage`,
    });
    if (!ok || !name) {
      throw new Error("Please upload an image");
    }
    let galleryNamesArray: any[] = [];
    await Promise.all(
      gallery.map(async (single: File) => {
        let bytes = await single.arrayBuffer();
        let buffer = Buffer.from(bytes);
        let { name, ok } = await handleUploadFilesS3({
          buffer,
          filename: single.name || "",
          tableName: "account",
          identifier: "gallery",
        });
        if (!ok || !name) {
          throw new Error("Please upload a valid image");
        }
        galleryNamesArray.push(name);
      })
    );

    let createdAccount = await prisma.account.create({
      data: {
        ...newAccData,
        accountImg: name,
        seller_id: `${user?.id}`,
      },
    });

    await Promise.all(
      galleryNamesArray?.map(async (single: string) => {
        await prisma.accountImage.create({
          data: {
            account_id: createdAccount.id,
            image: single,
          },
        });
      })
    );

    return createdAccount;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      throw new Error(error.errors[0]);
    } else {
      throw new Error(error.message);
    }
  }
}
