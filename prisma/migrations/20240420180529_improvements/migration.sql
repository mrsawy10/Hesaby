/*
  Warnings:

  - You are about to drop the column `describtion` on the `Platform` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Game` MODIFY `gameImg` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Platform` DROP COLUMN `describtion`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `platformImg` VARCHAR(191) NULL;
