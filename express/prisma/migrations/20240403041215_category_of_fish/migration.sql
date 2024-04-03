/*
  Warnings:

  - The values [TANGANYIKA] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('PEACOCK', 'HAP', 'MBUNA', 'FEATHERFIN', 'FRONTOSA', 'JULIOCHROMIS', 'LAMPROLOGINES', 'TROPHEUS', 'MISC_TANGANYIKA', 'VICTORIAN_CICHLIDS', 'OTHER');
ALTER TABLE "StoreSpecie" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "BaseSpecie" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "BaseSpecie" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TABLE "StoreSpecie" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
ALTER TABLE "StoreSpecie" ALTER COLUMN "category" SET DEFAULT 'OTHER';
ALTER TABLE "BaseSpecie" ALTER COLUMN "category" SET DEFAULT 'OTHER';
COMMIT;
