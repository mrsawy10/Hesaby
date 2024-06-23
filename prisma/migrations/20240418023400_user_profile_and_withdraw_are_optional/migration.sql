-- AlterTable
ALTER TABLE `User` MODIFY `profileImg` VARCHAR(191) NULL,
    MODIFY `balance` DOUBLE NULL DEFAULT 0,
    MODIFY `isWithdrawRequested` BOOLEAN NULL DEFAULT false,
    MODIFY `isBlocked` BOOLEAN NULL DEFAULT false;
