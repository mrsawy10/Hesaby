/*
  Warnings:

  - Added the required column `value` to the `SiteData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SiteData` ADD COLUMN `value` VARCHAR(191) NOT NULL;
