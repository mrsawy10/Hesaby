-- AlterTable
ALTER TABLE `Account` ADD COLUMN `game_email` VARCHAR(191) NULL,
    ADD COLUMN `game_password` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SiteData` MODIFY `value` VARCHAR(60000) NOT NULL;
