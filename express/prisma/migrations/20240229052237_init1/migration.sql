/*
  Warnings:

  - You are about to drop the `base_species` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_specie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_store_specie_id_fkey";

-- DropForeignKey
ALTER TABLE "store_specie" DROP CONSTRAINT "store_specie_base_specie_id_fkey";

-- DropTable
DROP TABLE "base_species";

-- DropTable
DROP TABLE "skus";

-- DropTable
DROP TABLE "store_specie";

-- CreateTable
CREATE TABLE "Base_Specie" (
    "specie_id" TEXT NOT NULL,
    "region" "Region" NOT NULL DEFAULT 'OTHER',
    "subgroup" "Subgroup" NOT NULL DEFAULT 'OTHER',
    "category" "Category" NOT NULL DEFAULT 'OTHER',
    "common_name" TEXT NOT NULL,
    "scientific_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "max_size" INTEGER NOT NULL,
    "temperament" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "compatability" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Base_Specie_pkey" PRIMARY KEY ("specie_id")
);

-- CreateTable
CREATE TABLE "Store_Specie" (
    "specie_id" TEXT NOT NULL,
    "base_specie_id" TEXT NOT NULL,
    "region" "Region" NOT NULL DEFAULT 'OTHER',
    "subgroup" "Subgroup" NOT NULL DEFAULT 'OTHER',
    "category" "Category" NOT NULL DEFAULT 'OTHER',
    "common_name" TEXT NOT NULL,
    "scientific_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "max_size" INTEGER NOT NULL,
    "temperament" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "compatability" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_Specie_pkey" PRIMARY KEY ("specie_id")
);

-- CreateTable
CREATE TABLE "Sku" (
    "sku_id" TEXT NOT NULL,
    "store_specie_id" TEXT NOT NULL,
    "size" "Size" NOT NULL DEFAULT 'M',
    "price" TEXT NOT NULL,
    "sex" "Sex" NOT NULL DEFAULT 'UNSEXED',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "is_available" BOOLEAN NOT NULL DEFAULT false,
    "is_oos" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sku_pkey" PRIMARY KEY ("sku_id")
);

-- AddForeignKey
ALTER TABLE "Store_Specie" ADD CONSTRAINT "Store_Specie_base_specie_id_fkey" FOREIGN KEY ("base_specie_id") REFERENCES "Base_Specie"("specie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sku" ADD CONSTRAINT "Sku_store_specie_id_fkey" FOREIGN KEY ("store_specie_id") REFERENCES "Store_Specie"("specie_id") ON DELETE CASCADE ON UPDATE CASCADE;
