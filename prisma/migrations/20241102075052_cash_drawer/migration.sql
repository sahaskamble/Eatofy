/*
  Warnings:

  - You are about to alter the column `TotalExpenses` on the `CashDrawer` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "CashDrawer" ADD COLUMN     "ExpensesAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ALTER COLUMN "TotalSales" DROP NOT NULL,
ALTER COLUMN "TotalExpenses" DROP NOT NULL,
ALTER COLUMN "TotalExpenses" DROP DEFAULT,
ALTER COLUMN "TotalExpenses" SET DATA TYPE INTEGER;
