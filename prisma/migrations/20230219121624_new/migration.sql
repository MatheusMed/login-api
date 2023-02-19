/*
  Warnings:

  - You are about to drop the column `completed` on the `Todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "completed",
ALTER COLUMN "createAt" DROP NOT NULL,
ALTER COLUMN "updateAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createAt" DROP NOT NULL,
ALTER COLUMN "updateAt" DROP NOT NULL;
