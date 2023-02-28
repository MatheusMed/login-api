/*
  Warnings:

  - You are about to drop the column `authorEmail` on the `Alarms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorToken` to the `Alarms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alarms" DROP CONSTRAINT "Alarms_authorEmail_fkey";

-- AlterTable
ALTER TABLE "Alarms" DROP COLUMN "authorEmail",
ADD COLUMN     "authorToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- AddForeignKey
ALTER TABLE "Alarms" ADD CONSTRAINT "Alarms_authorToken_fkey" FOREIGN KEY ("authorToken") REFERENCES "User"("token") ON DELETE RESTRICT ON UPDATE CASCADE;
