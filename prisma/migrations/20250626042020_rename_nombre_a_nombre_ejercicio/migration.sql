/*
  Warnings:

  - You are about to drop the column `id_ejercio` on the `Ejercicio_Rutina` table. All the data in the column will be lost.
  - Added the required column `id_ejercicio` to the `Ejercicio_Rutina` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ejercicio_Rutina" DROP CONSTRAINT "Ejercicio_Rutina_id_ejercio_fkey";

-- AlterTable
ALTER TABLE "Ejercicio_Rutina" DROP COLUMN "id_ejercio",
ADD COLUMN     "id_ejercicio" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ejercicio_Rutina" ADD CONSTRAINT "Ejercicio_Rutina_id_ejercicio_fkey" FOREIGN KEY ("id_ejercicio") REFERENCES "Ejercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
