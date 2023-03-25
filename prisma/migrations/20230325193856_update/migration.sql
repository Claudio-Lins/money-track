/*
  Warnings:

  - Added the required column `type` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('COMPANY', 'PERSONAL');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "type" "CategoryType" NOT NULL;
