/*
  Warnings:

  - Added the required column `name` to the `ItemPrepration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemPrepration" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "isReady" SET DEFAULT false;
