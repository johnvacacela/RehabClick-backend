-- CreateTable
CREATE TABLE "Mensajes" (
    "id" SERIAL NOT NULL,
    "id_emisor" INTEGER NOT NULL,
    "id_receptor" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    "visto" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mensajes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mensajes" ADD CONSTRAINT "Mensajes_id_emisor_fkey" FOREIGN KEY ("id_emisor") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensajes" ADD CONSTRAINT "Mensajes_id_receptor_fkey" FOREIGN KEY ("id_receptor") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
