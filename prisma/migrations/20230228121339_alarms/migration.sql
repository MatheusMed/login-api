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
