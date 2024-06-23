/*
  Warnings:

  - You are about to drop the column `platform_id` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_platform_id_fkey`;

-- AlterTable
ALTER TABLE `Game` DROP COLUMN `platform_id`;
