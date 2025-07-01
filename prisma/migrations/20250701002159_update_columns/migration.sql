/*
  Warnings:

  - You are about to drop the column `nombre` on the `Ejercicio_Rutina` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ejercicio_Rutina" DROP COLUMN "nombre";

-- AlterTable
ALTER TABLE "Rutina" ADD COLUMN     "nombre" VARCHAR(255);
