"use server";
import prisma from "@/prisma/db";
import handleDeleteFilesS3 from "@/lib/backend/s3Delete";
import { revalidatePath } from "next/cache";
import { deleteAccountAction } from "../account/delete-account";

export async function deleteGameAction(id: string) {
  try {
    let toBeDeletedAccounts = await prisma.account.findMany({
      where: { game_id: id },
    });
    await Promise.all(
      toBeDeletedAccounts.map(async ({ id }) => {
        return await deleteAccountAction(id);
      })
    );
    let deletedGame = await prisma.game.delete({ where: { id } });
    let { ok } = await handleDeleteFilesS3({
      key: deletedGame.gameImg ?? "",
    });
    if (!ok) {
      throw new Error("ُError while deleting main account image" + deletedGame.gameImg);
    }
    return deletedGame.gameImg;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
