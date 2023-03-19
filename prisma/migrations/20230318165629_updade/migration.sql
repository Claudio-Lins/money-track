-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_entryId_fkey";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
