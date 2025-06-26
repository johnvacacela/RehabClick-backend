import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { RoutineRecurrenceType } from './Types/routinesrecurrence.types';

@Injectable()
export class RoutineRecurrenceService {
  constructor(private prisma: PrismaService) {}

  async createRoutineRecurrence(data: RoutineRecurrenceType) {
    return await this.prisma.recurrencia_Rutina.create({
      data: {
        id_rutina: data.id_rutina,
        fechaHoraProgramada: data.fechaHoraProgramada,
        estado: data.estado,
      },
    });
  }

  async getAllRoutineRecurrence() {
    return await this.prisma.recurrencia_Rutina.findMany({
      include: {
        rutina: {
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
        },
      },
    });
  }

  async getAllRoutineRecurrencesByIdRoutine(id: number) {
    return await this.prisma.recurrencia_Rutina.findMany({
      where: {
        id_rutina: id,
      },
      include: {
        rutina: {
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
        },
      },
    });
  }
}
