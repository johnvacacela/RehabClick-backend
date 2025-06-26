import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { TherapistPatientType } from './Types/therapistpatient.types';

@Injectable()
export class TherapistPatientService {
  constructor(private prisma: PrismaService) {}

  async getAllTherapistPatients() {
    return await this.prisma.terapeuta_Paciente.findMany({
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
    });
  }

  async getTherapistPatientByPatientId(id: number) {
    return await this.prisma.terapeuta_Paciente.findMany({
      where: {
        id_paciente: id,
      },
      include: {
        terapeuta: {
          include: {
            usuario: {
              include: {
                datosExtraTerapeuta: true,
              },
            },
          },
        },
        paciente: {
          include: {
            usuario: {
              include: {
                datosExtraPaciente: true,
              },
            },
          },
        },
        rutina: {
          include: {
            recurrencia_rutina: true,
            ejercicio_rutina: {
              include: {
                ejercicio: true,
              },
            },
          },
        },
      },
    });
  }

  async getTherapistPatientByTherapistId(id: number) {
    return await this.prisma.terapeuta_Paciente.findMany({
      where: {
        id_terapeuta: id,
      },
      include: {
        paciente: true,
        terapeuta: true,
      },
    });
  }

  async createTherapistPatient(data: TherapistPatientType) {
    return await this.prisma.terapeuta_Paciente.create({
      data: {
        id_paciente: data.id_paciente,
        id_terapeuta: data.id_terapeuta,
        estado: data.estado,
      },
    });
  }
}
