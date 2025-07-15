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
        nombre: data.nombre,
      },
    });
  }

  async getAllRoutinesByTherapistId(id_terapeuta: number) {
    const routines = await this.prisma.rutina.findMany({
      where: {
        terapeuta_paciente: {
          terapeuta: {
            id: id_terapeuta,
          },
        },
      },
      select: {
        id: true,
        id_terapeuta_paciente: true,
        nombre: true,
        ejercicio_rutina: {
          select: {
            id: true,
            repeticiones: true,
            ejercicio: {
              select: {
                nombre: true,
                video_url: true,
              },
            },
          },
          orderBy: {
            orden: 'asc',
          },
        },
      },
    });

    return routines.map((routine) => ({
      id: routine.id,
      id_terapeuta_paciente: routine.id_terapeuta_paciente,
      nombre: routine.nombre,
      ejercicios: routine.ejercicio_rutina.map((er) => ({
        id: er.id,
        nombre: er.ejercicio.nombre,
        repeticiones: er.repeticiones,
        video_url: er.ejercicio.video_url,
      })),
    }));
  }

  async getAllRoutinesByIdTherapistPatient(id_terapeuta_paciente: number) {
    return await this.prisma.rutina.findMany({
      where: {
        id_terapeuta_paciente: id_terapeuta_paciente,
      },
      include: {
        ejercicio_rutina: {
          include: {
            ejercicio: true, // Incluye los ejercicios de la rutina
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
    });
  }
}
