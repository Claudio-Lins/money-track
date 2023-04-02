/*
  Warnings:

  - You are about to drop the column `type` on the `Category` table. All the data in the column will be lost.
  - Added the required column `account` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeAccount" AS ENUM ('CORPORATIVO', 'PESSOAL');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "account" "TypeAccount" NOT NULL;

-- DropEnum
DROP TYPE "CategoryType";
