-- CreateTable
CREATE TABLE "Citas" (
    "id" SERIAL NOT NULL,
    "id_terapeuta_paciente" INTEGER NOT NULL,
    "fechaHoraProgramada" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,
    "notas" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Citas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Citas" ADD CONSTRAINT "Citas_id_terapeuta_paciente_fkey" FOREIGN KEY ("id_terapeuta_paciente") REFERENCES "Terapeuta_Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
