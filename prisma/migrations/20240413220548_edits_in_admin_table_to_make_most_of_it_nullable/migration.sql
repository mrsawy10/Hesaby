/*
  Warnings:

  - You are about to drop the column `percentage` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Admin` DROP COLUMN `percentage`,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `phoneNumber` VARCHAR(191) NULL,
    MODIFY `isSuper` BOOLEAN NOT NULL DEFAULT false;
