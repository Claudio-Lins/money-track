-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "bankAccount" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "paymentMethod" DROP NOT NULL,
ALTER COLUMN "recurring" DROP NOT NULL;
