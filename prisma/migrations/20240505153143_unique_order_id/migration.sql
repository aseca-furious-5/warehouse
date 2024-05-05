/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `OrderPrepration` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderPrepration_orderId_key" ON "OrderPrepration"("orderId");
