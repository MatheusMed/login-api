-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "authorEmail" TEXT NOT NULL,

    CONSTRAINT "Todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
