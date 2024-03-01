-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PEACOCK', 'HAP', 'TANGANYIKA', 'OTHER');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'VARIETY');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'UNSEXED', 'BREEDINGGROUP');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('MALAWI', 'VICTORIA', 'TANGANYIKA', 'NEW_WORLD', 'OTHER');

-- CreateEnum
CREATE TYPE "Subgroup" AS ENUM ('OTHER');

-- CreateTable
CREATE TABLE "base_species" (
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

    CONSTRAINT "base_species_pkey" PRIMARY KEY ("specie_id")
);

-- CreateTable
CREATE TABLE "store_specie" (
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

    CONSTRAINT "store_specie_pkey" PRIMARY KEY ("specie_id")
);

-- CreateTable
CREATE TABLE "Store" (
    "store_id" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "is_shipping" BOOLEAN NOT NULL DEFAULT true,
    "is_pickup" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "skus" (
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

    CONSTRAINT "skus_pkey" PRIMARY KEY ("sku_id")
);

-- AddForeignKey
ALTER TABLE "store_specie" ADD CONSTRAINT "store_specie_base_specie_id_fkey" FOREIGN KEY ("base_specie_id") REFERENCES "base_species"("specie_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_store_specie_id_fkey" FOREIGN KEY ("store_specie_id") REFERENCES "store_specie"("specie_id") ON DELETE CASCADE ON UPDATE CASCADE;
