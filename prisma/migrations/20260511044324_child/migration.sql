/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Child` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Child` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Child" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Child_cpf_key" ON "Child"("cpf");
