"use server";
import prisma from "@/prisma/db";
import handleDeleteFilesS3 from "@/lib/backend/s3Delete";
import { revalidatePath } from "next/cache";

export async function deleteAccountAction(id: string) {
  try {
    let toBeDeleted = await prisma.accountImage.findMany({
      where: { account_id: id },
    });
    await prisma.accountImage.deleteMany({
      where: { account_id: id },
    });

    for (let i = 0; i < toBeDeleted.length; i++) {
      let { ok } = await handleDeleteFilesS3({
        key: toBeDeleted[i].image ?? "",
      });
      if (!ok) {
        throw new Error("ُError while deleting image" + toBeDeleted[i].image);
      }
    }

    let deletedAccount = await prisma.account.delete({ where: { id } });
    let { ok } = await handleDeleteFilesS3({
      key: deletedAccount.accountImg ?? "",
    });
    if (!ok) {
      throw new Error("ُError while deleting main account image" + deletedAccount.accountImg);
    }

    return deletedAccount;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
