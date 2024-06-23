import { Prisma as PrismaType } from "@prisma/client";
import { prisma } from "@/prisma/db";

type ValidTableNames = "platform" | "game";

export default async function addNewSubmitHandler({
  tableName,
  formData,
}: {
  tableName: ValidTableNames;
  formData: any;
}) {
  let createdEntry;

  switch (tableName) {
    case "game":
      createdEntry = await prisma.game.create({
        data: formData as PrismaType.GameCreateInput,
      });

      break;
    case "platform":
      createdEntry = await prisma.platform.create({
        data: formData as PrismaType.PlatformCreateInput,
      });
      break;
    default:
      return false;
  }
  return createdEntry;
}
