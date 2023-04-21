/*
  Warnings:

  - You are about to drop the column `depTarefaId` on the `Tarefa` table. All the data in the column will be lost.
  - You are about to drop the `Comentario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_tarefaId_fkey";

-- DropForeignKey
ALTER TABLE "Comentario" DROP CONSTRAINT "Comentario_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_depTarefaId_fkey";

-- AlterTable
ALTER TABLE "Tarefa" DROP COLUMN "depTarefaId";

-- DropTable
DROP TABLE "Comentario";

-- CreateTable
CREATE TABLE "_dependencies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_dependencies_AB_unique" ON "_dependencies"("A", "B");

-- CreateIndex
CREATE INDEX "_dependencies_B_index" ON "_dependencies"("B");

-- AddForeignKey
ALTER TABLE "_dependencies" ADD CONSTRAINT "_dependencies_A_fkey" FOREIGN KEY ("A") REFERENCES "Tarefa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dependencies" ADD CONSTRAINT "_dependencies_B_fkey" FOREIGN KEY ("B") REFERENCES "Tarefa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
