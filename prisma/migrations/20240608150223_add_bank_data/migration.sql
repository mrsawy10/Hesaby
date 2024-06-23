-- AlterTable
ALTER TABLE `SiteData` MODIFY `value` VARCHAR(60000) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `bank_name` VARCHAR(191) NULL,
    ADD COLUMN `card_holder_name` VARCHAR(191) NULL,
    ADD COLUMN `card_number` VARCHAR(191) NULL;
