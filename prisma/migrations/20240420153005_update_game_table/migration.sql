/*
  Warnings:

  - You are about to drop the column `gameFavicon` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `termsAndCondition` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Game` table. All the data in the column will be lost.
  - Made the column `platform_id` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_platform_id_fkey`;

-- AlterTable
ALTER TABLE `Game` DROP COLUMN `gameFavicon`,
    DROP COLUMN `termsAndCondition`,
    DROP COLUMN `type`,
    MODIFY `platform_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_platform_id_fkey` FOREIGN KEY (`platform_id`) REFERENCES `Platform`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
