/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_base_specie_id_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_sku_id_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_store_specie_id_fkey";

-- DropTable
DROP TABLE "Images";

-- CreateTable
CREATE TABLE "Image" (
    "image_id" TEXT NOT NULL,
    "base_specie_id" TEXT NOT NULL,
    "store_specie_id" TEXT NOT NULL,
    "sku_id" TEXT NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "is_secondary" BOOLEAN NOT NULL DEFAULT false,
    "is_thumbnail" BOOLEAN NOT NULL DEFAULT false,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "full_image_url" TEXT,
    "full_image_key" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("image_id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_base_specie_id_fkey" FOREIGN KEY ("base_specie_id") REFERENCES "Base_Specie"("specie_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_store_specie_id_fkey" FOREIGN KEY ("store_specie_id") REFERENCES "Store_Specie"("specie_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "Sku"("sku_id") ON DELETE CASCADE ON UPDATE CASCADE;
