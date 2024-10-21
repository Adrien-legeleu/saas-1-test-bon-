/*
  Warnings:

  - A unique constraint covering the columns `[stripeCurstomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "stripeCurstomerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCurstomerId_key" ON "User"("stripeCurstomerId");
