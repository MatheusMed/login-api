/*
  Warnings:

  - You are about to drop the `Alarm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alarm" DROP CONSTRAINT "Alarm_authorEmail_fkey";

-- DropTable
DROP TABLE "Alarm";

-- CreateTable
CREATE TABLE "Alarms" (
    "id" SERIAL NOT NULL,
    "alarm" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "authorEmail" TEXT NOT NULL,

    CONSTRAINT "Alarms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alarms" ADD CONSTRAINT "Alarms_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
