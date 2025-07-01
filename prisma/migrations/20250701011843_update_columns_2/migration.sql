/*
  Warnings:

  - Added the required column `video_url` to the `Ejercicio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orden` to the `Ejercicio_Rutina` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ejercicio" ADD COLUMN     "video_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ejercicio_Rutina" ADD COLUMN     "orden" INTEGER NOT NULL;
