"use server";
import prisma from "@/prisma/db";
import handleDeleteFilesS3 from "@/lib/backend/s3Delete";
import { revalidatePath } from "next/cache";
import { deleteAccountAction } from "../account/delete-account";

export async function deleteUserAction(id: string) {
  try {
    let toBeDeletedAccounts = await prisma.account.findMany({
      where: { seller_id: id },
    });
    await Promise.all(
      toBeDeletedAccounts.map(async ({ id }) => {
        return await deleteAccountAction(id);
      })
    );

    let deleted = await prisma.user.delete({ where: { id } });
    //
    if (deleted.profileImg) {
      let { ok: okProfile } = await handleDeleteFilesS3({
        key: deleted.profileImg ?? "",
      });
      if (!okProfile) {
        throw new Error("ُError while deletin proflei image" + deleted.profileImg);
      }
    }
    if (deleted.coverImg) {
      let { ok: okCover } = await handleDeleteFilesS3({
        key: deleted.coverImg ?? "",
      });
      if (!okCover) {
        throw new Error("ُError while deleting cover image" + deleted.coverImg);
      }
    }
    //
    return deleted;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
