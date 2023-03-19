/*
  Warnings:

  - You are about to drop the `entries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fuels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_entryId_fkey";

-- DropForeignKey
ALTER TABLE "entries" DROP CONSTRAINT "entries_userId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "icon" TEXT NOT NULL DEFAULT '/category/archive.svg';

-- DropTable
DROP TABLE "entries";

-- DropTable
DROP TABLE "fuels";

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "Type" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fuel" (
    "id" SERIAL NOT NULL,
    "pump" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "liters" INTEGER NOT NULL,
    "kms" INTEGER NOT NULL,
    "type" "FuelType" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fuel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
