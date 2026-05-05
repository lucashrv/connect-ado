/*
  Warnings:

  - You are about to drop the column `full_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `Adopter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `Child` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Adopter" ADD COLUMN     "full_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Child" ADD COLUMN     "full_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "full_name",
DROP COLUMN "username";
