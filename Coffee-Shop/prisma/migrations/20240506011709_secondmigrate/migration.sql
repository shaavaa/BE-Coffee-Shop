-- AlterTable
ALTER TABLE `order_detail` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);