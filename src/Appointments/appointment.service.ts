import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { AppointmentType } from './Types/appointment.types';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(appointment: AppointmentType) {
    return await this.prisma.citas.create({
      data: {
        fechaHoraProgramada: appointment.fechaHoraProgramada,
        estado: appointment.estado || 'PROGRAMADA',
        notas: appointment.notas ?? null,
        direccion: appointment.direccion,
        terapeuta_paciente: {
          connect: {
            id: appointment.id_terapeuta_paciente,
          },
        },
      },
    });
  }

  async completeAppointment(id: number) {
    return await this.prisma.citas.update({
      where: { id },
      data: { estado: 'COMPLETADA' },
    });
  }

  async cancelAppointment(id: number) {
    return await this.prisma.citas.update({
      where: { id },
      data: { estado: 'CANCELADA' },
    });
  }

  async getAllAppointmentsByPatientId(id: number) {
    const appointments = await this.prisma.citas.findMany({
      where: {
        terapeuta_paciente: {
          id_paciente: id,
        },
      },
      orderBy: {
        fechaHoraProgramada: 'asc',
      },
      select: {
        id: true,
        id_terapeuta_paciente: true,
        fechaHoraProgramada: true,
        estado: true,
        notas: true,
        direccion: true,
        terapeuta_paciente: {
          select: {
            terapeuta: {
              select: {
                usuario: {
                  select: {
                    nombres: true,
                    apellidos: true,
                    fotoUsuario: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return appointments.map((appointment) => ({
      id: appointment.id,
      id_terapeuta_paciente: appointment.id_terapeuta_paciente,
      nombreUsuario: `${appointment.terapeuta_paciente.terapeuta.usuario.nombres.split(' ')[0]} ${appointment.terapeuta_paciente.terapeuta.usuario.apellidos.split(' ')[0]}`,
      fotoUsuario: appointment.terapeuta_paciente.terapeuta.usuario.fotoUsuario,
      fechaHoraProgramada: appointment.fechaHoraProgramada,
      estado: appointment.estado,
      notas: appointment.notas,
      direccion: appointment.direccion,
    }));
  }

  async getAllApointmentsByTherapistId(id: number) {
    const appointments = await this.prisma.citas.findMany({
      where: {
        terapeuta_paciente: {
          id_terapeuta: id,
        },
      },
      orderBy: {
        fechaHoraProgramada: 'asc',
      },
      select: {
        id: true,
        id_terapeuta_paciente: true,
        fechaHoraProgramada: true,
        estado: true,
        notas: true,
        direccion: true,
        terapeuta_paciente: {
          select: {
            paciente: {
              select: {
                usuario: {
                  select: {
                    nombres: true,
                    apellidos: true,
                    fotoUsuario: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return appointments.map((appointment) => ({
      id: appointment.id,
      id_terapeuta_paciente: appointment.id_terapeuta_paciente,
      nombreUsuario: `${appointment.terapeuta_paciente.paciente.usuario.nombres.split(' ')[0]} ${appointment.terapeuta_paciente.paciente.usuario.apellidos.split(' ')[0]}`,
      fotoUsuario: appointment.terapeuta_paciente.paciente.usuario.fotoUsuario,
      fechaHoraProgramada: appointment.fechaHoraProgramada,
      estado: appointment.estado,
      notas: appointment.notas,
      direccion: appointment.direccion,
    }));
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
