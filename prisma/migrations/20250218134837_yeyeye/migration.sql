/*
  Warnings:

  - Added the required column `location` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitcount` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "unitcount" TEXT NOT NULL;
