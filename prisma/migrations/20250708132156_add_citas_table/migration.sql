/*
  Warnings:

  - Added the required column `direccion` to the `Citas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Citas" ADD COLUMN     "direccion" TEXT NOT NULL;
