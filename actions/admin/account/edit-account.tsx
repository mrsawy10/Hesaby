"use server";
import { accountSchema, editAccountSchema } from "@/lib/formSchemas";
import { cookies } from "next/headers";
import * as yup from "yup";
import bcrypt from "bcrypt";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose";
import handleUploadFilesS3 from "@/lib/backend/s3Upload";
import handleDeleteFilesS3 from "@/lib/backend/s3Delete";
import StatusGroup from "@/app/(dashboard)/dashboard/account/components/StatusGroup";

export async function editAccountAction(formData: FormData) {
  try {

    //
    let newAccData = {
      accountImg: formData.get("accountImg") as string,
      title: formData.get("title") as string,
      email: formData.get("email") as string,
      description: formData.get("description") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      platform_id: formData.get("platform_id") as string,
      game_id: formData.get("game_id") as string,
      price: Number(formData.get("price")),
      status: formData.get("status") as string,
      isFeatured: formData.get("isFeatured") as string,
      game_email: (formData.get("game_email") as string) ?? ``,
      game_password: (formData.get("game_password") as string) ?? ``,
      //   status: `pending`,
    };
    let account_id = formData.get("account_id") as string;
    let accountImg = formData.get("accountImg") as string;
    //
    let gallery: any[] = [];
    let galleryToBeRemoved: any[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("gallery[")) {
        gallery.push(value);
      }
    }
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("galleryToBeRemoved[")) {
        galleryToBeRemoved.push(value);
      }
    }
    editAccountSchema.validateSync(
      { ...Object.fromEntries(formData.entries()), gallery },
      { abortEarly: false }
    );
    //
    if (galleryToBeRemoved.length > 0) {
      let toBeDeleted = await prisma.accountImage.findMany({
        where: {
          id: { in: galleryToBeRemoved },
        },
      });

      for (let i = 0; i < toBeDeleted.length; i++) {
        let { ok } = await handleDeleteFilesS3({
          key: toBeDeleted[i].image ?? "",
        });
        if (!ok) {
          throw new Error("ُError while deleting image" + toBeDeleted[i].image);
        }
      }

      let testReturn = await prisma.accountImage.deleteMany({
        where: {
          id: { in: galleryToBeRemoved },
        },
      });

      console.log(`testReturnDeleteMany==>`, testReturn);
    }
    let galleryNamesArray: any[] = [];
    if (gallery.length > 0) {
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
      await Promise.all(
        galleryNamesArray?.map(async (single: string) => {
          await prisma.accountImage.create({
            data: {
              account_id: account_id,
              image: single,
            },
          });
        })
      );
    }

    let mainImage = formData.get("mainImage");
    if (!(mainImage instanceof File) && mainImage) {
      throw new Error("Please upload an image");
    }
    if (mainImage) {
      let { ok: deleteOk } = await handleDeleteFilesS3({
        key: accountImg ?? "",
      });
      if (!deleteOk) {
        throw new Error("Error while deleting image" + accountImg);
      }

      let bytes = await (mainImage as File)?.arrayBuffer();
      let buffer = Buffer.from(bytes);
      let { name, ok: UploadOk } = await handleUploadFilesS3({
        buffer,
        filename: `${(mainImage as File)?.name ?? ``}`,
        tableName: "account",
        identifier: "mainImage",
      });

      if (!UploadOk || !name) {
        throw new Error("Error while uploading image" + accountImg);
      }
      newAccData.accountImg = name;
    }

    let updatedAccount = await prisma.account.update({
      where: {
        id: account_id,
      },
      data: {
        ...newAccData,
        isFeatured: newAccData.isFeatured === "true",
      },
    });

    return updatedAccount;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      throw new Error(error.errors[0]);
    } else {
      throw new Error(error.message);
    }
  }
}
