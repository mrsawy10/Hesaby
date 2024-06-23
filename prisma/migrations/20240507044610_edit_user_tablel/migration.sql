/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `balance` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isWithdrawRequested` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isBlocked` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `earnings` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numberOfDeals` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `emailVerified`,
    ADD COLUMN `coverImg` VARCHAR(191) NULL,
    ADD COLUMN `isEmailVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isPhoneVerified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `balance` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `isWithdrawRequested` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isBlocked` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `earnings` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `numberOfDeals` DOUBLE NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `User_phoneNumber_key` ON `User`(`phoneNumber`);
