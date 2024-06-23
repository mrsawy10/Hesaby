/*
  Warnings:

  - You are about to drop the column `platformId` on the `Account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_platformId_fkey`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `platformId`;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_platform_id_fkey` FOREIGN KEY (`platform_id`) REFERENCES `Platform`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
