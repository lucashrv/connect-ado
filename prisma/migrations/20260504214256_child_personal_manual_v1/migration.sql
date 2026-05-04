/*
  Warnings:

  - You are about to drop the column `full_name` on the `Adopter` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Adopter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MASCULINE', 'FEMININE');

-- AlterTable
ALTER TABLE "Adopter" DROP COLUMN "full_name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "governmentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Child" DROP COLUMN "age",
DROP COLUMN "full_name",
ADD COLUMN     "birth_date" DATE NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "full_name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ChildPersonalManual" (
    "id" TEXT NOT NULL,
    "daily_routine" TEXT,
    "favorite_food" TEXT,
    "favorite_music" TEXT,
    "favorite_activity" TEXT,
    "hobbies" TEXT,
    "study_habits" TEXT,
    "fears" TEXT,
    "notes" TEXT,
    "child_id" TEXT NOT NULL,

    CONSTRAINT "ChildPersonalManual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChildPersonalManual_child_id_key" ON "ChildPersonalManual"("child_id");

-- AddForeignKey
ALTER TABLE "ChildPersonalManual" ADD CONSTRAINT "ChildPersonalManual_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
