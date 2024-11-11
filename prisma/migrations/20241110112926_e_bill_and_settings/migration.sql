-- CreateTable
CREATE TABLE "EbillSmsSettings" (
    "id" TEXT NOT NULL,
    "Visibility" BOOLEAN NOT NULL DEFAULT false,
    "Email" TEXT,
    "AppPassword" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "HotelId" TEXT NOT NULL,

    CONSTRAINT "EbillSmsSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelInfoSettings" (
    "id" TEXT NOT NULL,
    "Visibility" BOOLEAN NOT NULL DEFAULT false,
    "GSTINNO" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "HotelId" TEXT NOT NULL,

    CONSTRAINT "HotelInfoSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EbillSmsSettings_id_key" ON "EbillSmsSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HotelInfoSettings_id_key" ON "HotelInfoSettings"("id");

-- AddForeignKey
ALTER TABLE "EbillSmsSettings" ADD CONSTRAINT "EbillSmsSettings_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelInfoSettings" ADD CONSTRAINT "HotelInfoSettings_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
