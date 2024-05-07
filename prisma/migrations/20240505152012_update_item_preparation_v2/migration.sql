/*
  Warnings:

  - Added the required column `itemId` to the `ItemPrepration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemPrepration" ADD COLUMN     "itemId" INTEGER NOT NULL;
