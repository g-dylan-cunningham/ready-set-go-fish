-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PEACOCK', 'HAP', 'TANGANYIKA', 'OTHER');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'UNSEXED', 'BREEDINGGROUP');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('MALAWI', 'VICTORIA', 'TANGANYIKA', 'NEW_WORLD', 'OTHER');

-- CreateEnum
CREATE TYPE "Subgroup" AS ENUM ('OTHER');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('UnitedStates', 'Canada', 'Mexico', 'UK', 'Ireland', 'Netherlands', 'Germany', 'Belgium', 'France', 'Thailand', 'Vietnam', 'Laos', 'Cambodia', 'Australia', 'NewZealand', 'Austria', 'CzechRepublic', 'China', 'Poland', 'Italy', 'Greece', 'Russia', 'Japan', 'Korea', 'India', 'Other');

-- CreateTable
CREATE TABLE "BaseSpecie" (
    "id" TEXT NOT NULL,
    "region" "Region" NOT NULL DEFAULT 'OTHER',
    "subgroup" "Subgroup" NOT NULL DEFAULT 'OTHER',
    "category" "Category" NOT NULL DEFAULT 'OTHER',
    "commonName" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "kingdom" TEXT NOT NULL DEFAULT 'Animalia',
    "phylum" TEXT NOT NULL DEFAULT 'Chordata',
    "class" TEXT NOT NULL DEFAULT 'Actinopterygli',
    "order" TEXT NOT NULL DEFAULT 'Cichliformes',
    "family" TEXT NOT NULL DEFAULT 'Cichlidae',
    "genus" TEXT NOT NULL,
    "species" TEXT NOT NULL,
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
    "storePath" TEXT,
    "description1" TEXT,
    "description2" TEXT,
    "description3" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "intlPhone" TEXT,
    "locationPostal" TEXT,
    "isShipping" BOOLEAN NOT NULL DEFAULT true,
    "isPickUp" BOOLEAN NOT NULL DEFAULT true,
    "isHidePhone" BOOLEAN NOT NULL DEFAULT true,
    "isHideAddress" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sku" (
    "id" TEXT NOT NULL,
    "storeSpecieId" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
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
    "id" TEXT NOT NULL,
    "displayName" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locationPostal" TEXT NOT NULL,
    "firstName" TEXT,
    "middleName" TEXT,
    "birthday" TEXT,
    "lastName" TEXT,
    "isSeller" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "storeId" TEXT,
    "street1" TEXT,
    "street2" TEXT,
    "isIntl" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT,
    "state" "State",
    "postal" TEXT,
    "intlPostal" TEXT,
    "country" "Country" NOT NULL DEFAULT 'UnitedStates',
    "province" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StoreToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_storeName_key" ON "Store"("storeName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_storeId_key" ON "Address"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "_StoreToUser_AB_unique" ON "_StoreToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_StoreToUser_B_index" ON "_StoreToUser"("B");

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

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreToUser" ADD CONSTRAINT "_StoreToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoreToUser" ADD CONSTRAINT "_StoreToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
