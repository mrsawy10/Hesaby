"use server";
import prisma from "@/prisma/db";
import handleDeleteFilesS3 from "@/lib/backend/s3Delete";
import { revalidatePath } from "next/cache";
import { deleteAccountAction } from "../account/delete-account";

export async function deletePlatformAction(id: string) {
  try {
    let toBeDeletedAccounts = await prisma.account.findMany({
      where: { platform_id: id },
    });
    await Promise.all(
      toBeDeletedAccounts.map(async ({ id }) => {
        return await deleteAccountAction(id);
      })
    );

    let deleted = await prisma.platform.delete({ where: { id } });
    let { ok } = await handleDeleteFilesS3({
      key: deleted.platformImg ?? "",
    });
    if (!ok) {
      throw new Error("ُError while deleting image" + deleted.platformImg);
    }
    return deleted.platformImg;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
