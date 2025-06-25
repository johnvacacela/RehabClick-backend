-- CreateTable
CREATE TABLE "Rutina" (
    "id" SERIAL NOT NULL,
    "id_terapeuta_paciente" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rutina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recurrencia_Rutina" (
    "id" SERIAL NOT NULL,
    "id_rutina" INTEGER NOT NULL,
    "fechaHoraProgramada" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recurrencia_Rutina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ejercicio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ejercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ejercicio_Rutina" (
    "id" SERIAL NOT NULL,
    "id_rutina" INTEGER NOT NULL,
    "id_ejercio" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "repeticiones" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ejercicio_Rutina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rutina" ADD CONSTRAINT "Rutina_id_terapeuta_paciente_fkey" FOREIGN KEY ("id_terapeuta_paciente") REFERENCES "Terapeuta_Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recurrencia_Rutina" ADD CONSTRAINT "Recurrencia_Rutina_id_rutina_fkey" FOREIGN KEY ("id_rutina") REFERENCES "Rutina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ejercicio_Rutina" ADD CONSTRAINT "Ejercicio_Rutina_id_rutina_fkey" FOREIGN KEY ("id_rutina") REFERENCES "Rutina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ejercicio_Rutina" ADD CONSTRAINT "Ejercicio_Rutina_id_ejercio_fkey" FOREIGN KEY ("id_ejercio") REFERENCES "Ejercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
