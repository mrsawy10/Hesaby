/*
  Warnings:

  - A unique constraint covering the columns `[iban]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `iban` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_iban_key` ON `User`(`iban`);
