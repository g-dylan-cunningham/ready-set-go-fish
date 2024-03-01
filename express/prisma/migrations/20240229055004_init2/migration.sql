-- CreateTable
CREATE TABLE "Images" (
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

    CONSTRAINT "Images_pkey" PRIMARY KEY ("image_id")
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
    "is_seller" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_base_specie_id_fkey" FOREIGN KEY ("base_specie_id") REFERENCES "Base_Specie"("specie_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_store_specie_id_fkey" FOREIGN KEY ("store_specie_id") REFERENCES "Store_Specie"("specie_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "Sku"("sku_id") ON DELETE CASCADE ON UPDATE CASCADE;
