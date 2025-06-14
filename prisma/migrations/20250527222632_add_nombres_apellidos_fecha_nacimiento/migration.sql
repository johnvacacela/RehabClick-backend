/*
  Warnings:

  - You are about to drop the column `nombre` on the `Usuarios` table. All the data in the column will be lost.
  - Added the required column `apellidos` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaNacimiento` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "nombre",
ADD COLUMN     "apellidos" TEXT NOT NULL,
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nombres" TEXT NOT NULL;
