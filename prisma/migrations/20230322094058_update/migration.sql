/*
  Warnings:

  - You are about to drop the column `entryId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `place` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Fuel` table. All the data in the column will be lost.
  - You are about to drop the column `pump` on the `Fuel` table. All the data in the column will be lost.
  - Added the required column `bankAccount` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurring` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Fuel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Fuel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceLt` to the `Fuel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Recurring" AS ENUM ('FIXED', 'VARIABLE');

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_entryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "entryId";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "note",
DROP COLUMN "place",
ADD COLUMN     "bankAccount" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "recurring" "Recurring" NOT NULL;

-- AlterTable
ALTER TABLE "Fuel" DROP COLUMN "price",
DROP COLUMN "pump",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "priceLt" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "liters" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "EntryCategory" (
    "id" SERIAL NOT NULL,
    "entryId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntryCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EntryCategory_AB_unique" ON "_EntryCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryCategory_B_index" ON "_EntryCategory"("B");

-- AddForeignKey
ALTER TABLE "EntryCategory" ADD CONSTRAINT "EntryCategory_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntryCategory" ADD CONSTRAINT "EntryCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryCategory" ADD CONSTRAINT "_EntryCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryCategory" ADD CONSTRAINT "_EntryCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
