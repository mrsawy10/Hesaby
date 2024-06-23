/*
  Warnings:

  - Added the required column `accountImg` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` ADD COLUMN `accountImg` VARCHAR(191) NOT NULL,
    ADD COLUMN `platform_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_platform_id_fkey` FOREIGN KEY (`platform_id`) REFERENCES `Platform`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
