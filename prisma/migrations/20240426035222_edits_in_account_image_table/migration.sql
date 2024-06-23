/*
  Warnings:

  - You are about to drop the column `alt` on the `AccountImage` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `AccountImage` table. All the data in the column will be lost.
  - Added the required column `image` to the `AccountImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AccountImage` DROP COLUMN `alt`,
    DROP COLUMN `url`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;
