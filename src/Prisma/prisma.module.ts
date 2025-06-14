import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//El module marca la clase como un módulo de NestJS, lo que permite organizar el código en módulos reutilizables y separados
@Module({
  providers: [PrismaService], //Servicios disponibles dentro de este modulo
  exports: [PrismaService], // Servicios que este modulo expone para otros modulos
})
export class PrismaModule {}
