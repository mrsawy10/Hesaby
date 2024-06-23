/*
  Warnings:

  - You are about to drop the column `logo` on the `SiteData` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `SiteData` table. All the data in the column will be lost.
  - You are about to drop the column `termsConditions` on the `SiteData` table. All the data in the column will be lost.
  - You are about to drop the `FaQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Silder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `identifier` to the `SiteData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_game_id_fkey`;

-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_platform_id_fkey`;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `platformId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SiteData` DROP COLUMN `logo`,
    DROP COLUMN `tax`,
    DROP COLUMN `termsConditions`,
    ADD COLUMN `identifier` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `FaQ`;

-- DropTable
DROP TABLE `Silder`;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `content` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_platformId_fkey` FOREIGN KEY (`platformId`) REFERENCES `Platform`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
