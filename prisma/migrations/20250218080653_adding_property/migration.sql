/*
  Warnings:

  - Added the required column `propertyId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "propertyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
