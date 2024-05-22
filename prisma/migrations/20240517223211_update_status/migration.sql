/*
  Warnings:

  - The values [READY] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PREPARING', 'READY_TO_DISPATCH', 'DISPATCHED');
ALTER TABLE "OrderPrepration" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "OrderPrepration" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "OrderPrepration" ALTER COLUMN "status" SET DEFAULT 'PREPARING';
COMMIT;
