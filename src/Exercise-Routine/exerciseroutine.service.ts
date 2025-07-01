import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ExerciseRoutineType } from './Types/exerciseroutine.types';

@Injectable()
export class ExerciseRoutineService {
  constructor(private prisma: PrismaService) {}

  async createExerciseRoutine(data: ExerciseRoutineType) {
    return await this.prisma.ejercicio_Rutina.create({
      data: {
        id_rutina: data.id_rutina,
        id_ejercicio: data.id_ejercicio,
        repeticiones: data.repeticiones,
        orden: data.orden || 0
      },
    });
  }

  async getAllExerciseRoutinesByIdRoutine(id: number) {
    return await this.prisma.ejercicio_Rutina.findMany({
      where: {
        id_rutina: id,
      },
      include: {
        rutina: {
          include: {
            recurrencia_rutina: true,
            ejercicio_rutina: {
              include: {
                ejercicio: true,
              },
            },
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
        },
      },
    });
  }
}
