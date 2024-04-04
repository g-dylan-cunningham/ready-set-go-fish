/*
  Warnings:

  - You are about to drop the column `storeId` on the `StoreSpecie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoreSpecie" DROP CONSTRAINT "StoreSpecie_storeId_fkey";

-- AlterTable
ALTER TABLE "StoreSpecie" DROP COLUMN "storeId",
ADD COLUMN     "storeName" TEXT;

-- AddForeignKey
ALTER TABLE "StoreSpecie" ADD CONSTRAINT "StoreSpecie_storeName_fkey" FOREIGN KEY ("storeName") REFERENCES "Store"("storeName") ON DELETE SET NULL ON UPDATE CASCADE;
