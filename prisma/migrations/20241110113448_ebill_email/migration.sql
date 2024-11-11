/*
  Warnings:

  - You are about to drop the `EbillSmsSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EbillSmsSettings" DROP CONSTRAINT "EbillSmsSettings_HotelId_fkey";

-- DropTable
DROP TABLE "EbillSmsSettings";

-- CreateTable
CREATE TABLE "EbillEmailSettings" (
    "id" TEXT NOT NULL,
    "Visibility" BOOLEAN NOT NULL DEFAULT false,
    "Email" TEXT,
    "AppPassword" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "HotelId" TEXT NOT NULL,

    CONSTRAINT "EbillEmailSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EbillEmailSettings_id_key" ON "EbillEmailSettings"("id");

-- AddForeignKey
ALTER TABLE "EbillEmailSettings" ADD CONSTRAINT "EbillEmailSettings_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
