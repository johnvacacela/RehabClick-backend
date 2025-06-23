-- CreateTable
CREATE TABLE "Terapeuta_Paciente" (
    "id" SERIAL NOT NULL,
    "id_terapeuta" INTEGER NOT NULL,
    "id_paciente" INTEGER NOT NULL,
    "estado" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Terapeuta_Paciente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Terapeuta_Paciente" ADD CONSTRAINT "Terapeuta_Paciente_id_terapeuta_fkey" FOREIGN KEY ("id_terapeuta") REFERENCES "Terapeutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Terapeuta_Paciente" ADD CONSTRAINT "Terapeuta_Paciente_id_paciente_fkey" FOREIGN KEY ("id_paciente") REFERENCES "Pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
