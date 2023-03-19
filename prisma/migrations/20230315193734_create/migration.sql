-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('GASOLEO', 'GASOLINA', 'GAS');

-- CreateTable
CREATE TABLE "fuels" (
    "id" SERIAL NOT NULL,
    "pump" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "liters" INTEGER NOT NULL,
    "kms" INTEGER NOT NULL,
    "type" "FuelType" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fuels_pkey" PRIMARY KEY ("id")
);
