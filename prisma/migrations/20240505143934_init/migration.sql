-- CreateTable
CREATE TABLE "OrderPrepration" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderPrepration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPrepration" (
    "id" SERIAL NOT NULL,
    "isReady" BOOLEAN NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderPreprationId" INTEGER NOT NULL,

    CONSTRAINT "ItemPrepration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemPrepration" ADD CONSTRAINT "ItemPrepration_orderPreprationId_fkey" FOREIGN KEY ("orderPreprationId") REFERENCES "OrderPrepration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
