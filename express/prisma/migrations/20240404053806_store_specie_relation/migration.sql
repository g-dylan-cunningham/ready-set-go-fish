-- AlterTable
ALTER TABLE "StoreSpecie" ADD COLUMN     "storeId" TEXT;

-- AddForeignKey
ALTER TABLE "StoreSpecie" ADD CONSTRAINT "StoreSpecie_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
