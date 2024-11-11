-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "Reason" TEXT,
ALTER COLUMN "Status" SET DEFAULT 'Ordered';
