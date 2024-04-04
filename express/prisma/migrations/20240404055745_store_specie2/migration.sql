/*
  Warnings:

  - You are about to drop the column `storeName` on the `StoreSpecie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StoreSpecie" DROP CONSTRAINT "StoreSpecie_storeName_fkey";

-- AlterTable
ALTER TABLE "StoreSpecie" DROP COLUMN "storeName",
ADD COLUMN     "storeId" TEXT;

-- AddForeignKey
ALTER TABLE "StoreSpecie" ADD CONSTRAINT "StoreSpecie_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
