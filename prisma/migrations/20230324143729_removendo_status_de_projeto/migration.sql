/*
  Warnings:

  - You are about to drop the column `status` on the `Projeto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projeto" DROP COLUMN "status";

-- DropEnum
DROP TYPE "StatusProjeto";
