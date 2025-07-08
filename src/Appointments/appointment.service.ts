import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { AppointmentType } from './Types/appointment.types';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(appointment: AppointmentType) {
    return await this.prisma.citas.create({
      data: {
        id_terapeuta_paciente: appointment.id_terapeuta_paciente,
        fechaHoraProgramada: appointment.fechaHoraProgramada,
        estado: appointment.estado,
        notas: appointment.notas ?? null,
        direccion: appointment.direccion,
      },
    });
  }

  async getAllAppointsByTherapistPatientId(id: number) {
    return await this.prisma.citas.findMany({
      where: {
        id_terapeuta_paciente: id,
      },
      orderBy: {
        fechaHoraProgramada: 'asc',
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
