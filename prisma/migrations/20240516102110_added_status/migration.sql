-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PREPARING', 'READY', 'DELIVERED');

-- AlterTable
ALTER TABLE "OrderPrepration" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PREPARING';
