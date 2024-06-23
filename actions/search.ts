"use server";
import { accountSchema } from "@/lib/formSchemas";
import { cookies } from "next/headers";
import * as yup from "yup";
import bcrypt from "bcrypt";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose";
import handleUploadFilesS3 from "@/lib/backend/s3Upload";
import { revalidatePath } from "next/cache";

// export const dynamic = "force-dynamic";

export async function searchAction(table: `games` | `game` | `account`, keyword: string) {
  try {
    console.log(`seracg action here`);
    if (!keyword) throw new Error(`Invalid Value`);
    console.log({ keyword });

    //     let result: any[];
    //     switch (table) {
    //       case "game":
    //         result = await prisma.game.findMany({
    //           where: {
    //             OR: [{ title: { contains: keyword } }, { description: { contains: keyword } }],
    //           },
    //         });
    //       case "account":
    //         result = await prisma.account.findMany({
    //           where: {
    //             OR: [{ title: { contains: keyword } }, { description: { contains: keyword } }],
    //           },
    //         });
    //     }
    //     if (!result || result.length < 1) throw new Error(`No Result Was Found`);
    console.log({ keyword });

    return revalidatePath(`/${table}/?keyword=${keyword}`);

    // return result;
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      throw new Error(error.errors[0]);
    } else {
      throw new Error(error.message);
    }
  }
}
