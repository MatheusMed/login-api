/*
  Warnings:

  - You are about to drop the `Alarms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alarms" DROP CONSTRAINT "Alarms_authorToken_fkey";

-- DropTable
DROP TABLE "Alarms";
