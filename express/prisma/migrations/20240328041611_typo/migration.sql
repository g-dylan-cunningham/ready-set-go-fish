/*
  Warnings:

  - You are about to drop the column `isPickup` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "isPickup",
ADD COLUMN     "isPickUp" BOOLEAN NOT NULL DEFAULT true;
