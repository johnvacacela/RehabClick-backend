-- CreateTable
CREATE TABLE "PlanesTerapeuta" (
    "id" SERIAL NOT NULL,
    "id_terapeuta" INTEGER NOT NULL,
    "precio_mensual" DOUBLE PRECISION NOT NULL,
    "precio_anual" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanesTerapeuta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanesTerapeuta_id_terapeuta_key" ON "PlanesTerapeuta"("id_terapeuta");

-- AddForeignKey
ALTER TABLE "PlanesTerapeuta" ADD CONSTRAINT "PlanesTerapeuta_id_terapeuta_fkey" FOREIGN KEY ("id_terapeuta") REFERENCES "Terapeutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
