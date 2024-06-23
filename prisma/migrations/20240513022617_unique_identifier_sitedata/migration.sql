/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `SiteData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Account_platform_id_fkey` ON `Account`;

-- CreateIndex
CREATE UNIQUE INDEX `SiteData_identifier_key` ON `SiteData`(`identifier`);
