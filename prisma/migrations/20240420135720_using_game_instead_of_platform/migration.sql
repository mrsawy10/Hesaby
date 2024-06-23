/*
  Warnings:

  - You are about to drop the column `platform_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `console_id` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the column `platformFavicon` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the column `termsAndCondition` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the `Console` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `game_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_platform_id_fkey`;

-- DropForeignKey
ALTER TABLE `Platform` DROP FOREIGN KEY `Platform_console_id_fkey`;

-- AlterTable
ALTER TABLE `Account` DROP COLUMN `platform_id`,
    ADD COLUMN `game_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Platform` DROP COLUMN `console_id`,
    DROP COLUMN `platformFavicon`,
    DROP COLUMN `termsAndCondition`,
    DROP COLUMN `type`;

-- DropTable
DROP TABLE `Console`;

-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `describtion` VARCHAR(191) NOT NULL,
    `gameImg` VARCHAR(191) NOT NULL,
    `gameFavicon` VARCHAR(191) NOT NULL,
    `termsAndCondition` VARCHAR(191) NOT NULL,
    `platform_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_platform_id_fkey` FOREIGN KEY (`platform_id`) REFERENCES `Platform`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
