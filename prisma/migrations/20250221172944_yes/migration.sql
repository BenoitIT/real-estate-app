/*
  Warnings:

  - Changed the type of `sdate` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `edate` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "sdate",
ADD COLUMN     "sdate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "edate",
ADD COLUMN     "edate" TIMESTAMP(3) NOT NULL;
