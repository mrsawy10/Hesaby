/*
  Warnings:

  - A unique constraint covering the columns `[account_id,user_id]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Cart_account_id_user_id_key` ON `Cart`(`account_id`, `user_id`);
