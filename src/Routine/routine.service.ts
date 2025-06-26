import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { RoutineType } from './Types/routine.types';

@Injectable()
export class RoutineService {
  constructor(private prisma: PrismaService) {}

  async createRoutine(data: RoutineType) {
    return await this.prisma.rutina.create({
      data: {
        id_terapeuta_paciente: data.id_terapeuta_paciente,
      },
    });
  }

  async getAllRoutinesByIdTherapistPatient(id_terapeuta_paciente: number) {
    return await this.prisma.rutina.findMany({
      where: {
        id_terapeuta_paciente: id_terapeuta_paciente,
      },
      include: {
        terapeuta_paciente: {
          include: {
            paciente: {
              include: {
                usuario: {
                  include: {
                    datosExtraPaciente: true,
                  },
                },
              },
            },
            terapeuta: {
              include: {
                usuario: {
                  include: {
                    datosExtraTerapeuta: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
