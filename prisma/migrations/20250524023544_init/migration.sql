-- CreateTable
CREATE TABLE "Terapeutas" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "aniosExperiencia" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Terapeutas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pacientes" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pacientes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Terapeutas" ADD CONSTRAINT "Terapeutas_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pacientes" ADD CONSTRAINT "Pacientes_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
