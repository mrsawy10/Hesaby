/*
  Warnings:

  - A unique constraint covering the columns `[account_id,user_id]` on the table `WishList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `WishList_account_id_user_id_key` ON `WishList`(`account_id`, `user_id`);
