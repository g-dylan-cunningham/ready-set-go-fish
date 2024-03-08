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
CREATE TABLE "BaseSpecie" (
    "id" TEXT NOT NULL,
    "region" "Region" NOT NULL DEFAULT 'OTHER',
    "subgroup" "Subgroup" NOT NULL DEFAULT 'OTHER',
    "category" "Category" NOT NULL DEFAULT 'OTHER',
    "commonName" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxSize" INTEGER NOT NULL,
    "temperament" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "compatability" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseSpecie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreSpecie" (
    "id" TEXT NOT NULL,
    "baseSpecieId" TEXT,
    "region" "Region" NOT NULL DEFAULT 'OTHER',
    "subgroup" "Subgroup" NOT NULL DEFAULT 'OTHER',
    "category" "Category" NOT NULL DEFAULT 'OTHER',
    "commonName" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxSize" INTEGER NOT NULL,
    "temperament" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "compatability" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoreSpecie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isShipping" BOOLEAN NOT NULL DEFAULT true,
    "isPickup" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sku" (
    "id" TEXT NOT NULL,
    "storeSpecieId" TEXT NOT NULL,
    "size" "Size" NOT NULL DEFAULT 'M',
    "price" TEXT NOT NULL,
    "sex" "Sex" NOT NULL DEFAULT 'UNSEXED',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "isAvailable" BOOLEAN NOT NULL DEFAULT false,
    "isOos" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "baseSpecieId" TEXT NOT NULL,
    "storeSpecieId" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isSecondary" BOOLEAN NOT NULL DEFAULT false,
    "isThumbnail" BOOLEAN NOT NULL DEFAULT false,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "fullImageUrl" TEXT,
    "fullImageKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "zip" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "state" TEXT,
    "street1" TEXT,
    "street2" TEXT,
    "city" TEXT,
    "country" TEXT,
    "isSeller" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "StoreSpecie" ADD CONSTRAINT "StoreSpecie_baseSpecieId_fkey" FOREIGN KEY ("baseSpecieId") REFERENCES "BaseSpecie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sku" ADD CONSTRAINT "Sku_storeSpecieId_fkey" FOREIGN KEY ("storeSpecieId") REFERENCES "StoreSpecie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_baseSpecieId_fkey" FOREIGN KEY ("baseSpecieId") REFERENCES "BaseSpecie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_storeSpecieId_fkey" FOREIGN KEY ("storeSpecieId") REFERENCES "StoreSpecie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE CASCADE ON UPDATE CASCADE;
