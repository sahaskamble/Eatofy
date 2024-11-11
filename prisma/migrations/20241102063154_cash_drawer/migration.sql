/*
  Warnings:

  - You are about to drop the column `Card` on the `CashDrawer` table. All the data in the column will be lost.
  - You are about to drop the column `Cash` on the `CashDrawer` table. All the data in the column will be lost.
  - You are about to drop the column `Credit` on the `CashDrawer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CashDrawer" DROP COLUMN "Card",
DROP COLUMN "Cash",
DROP COLUMN "Credit";
