import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { TherapistPlansType } from './Types/therapistplans.types';

@Injectable()
export class TherapistPlansService {
  constructor(private prisma: PrismaService) {}

  async getAllTherapistPlans() {
    return await this.prisma.planesTerapeuta.findMany({
      select: {
        id: true,
        id_terapeuta: true,
        precio_mensual: true,
        precio_anual: true,
        terapeuta: {
          select: {
            aniosExperiencia: true,
            titulo: true,
            usuario: {
              select: {
                nombres: true,
                apellidos: true,
                fotoUsuario: true,
                genero: true,
                fechaNacimiento: true,
              },
            },
          },
        },
      },
    });
  }

  async getTherapistPlansByTherapistId(id: number) {
    return await this.prisma.planesTerapeuta.findUnique({
      where: { id_terapeuta: id },
      select: {
        precio_mensual: true,
        precio_anual: true,
      },
    });
  }

  async getTherapistPlanTypeByTherapistId(id: number, type: string) {
    const plan = await this.prisma.planesTerapeuta.findUnique({
      where: { id_terapeuta: id },
      select: {
        precio_mensual: true,
        precio_anual: true,
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
    });

    if (!plan) {
      return null;
    }

    return {
      id_terapeuta: id,
      nombre_usuario: `${plan.terapeuta.usuario.nombres.split(' ')[0]} ${plan.terapeuta.usuario.apellidos.split(' ')[0]}`,
      tipo: type,
      foto_usuario: plan.terapeuta.usuario.fotoUsuario,
      precio: type === 'monthly' ? plan.precio_mensual : plan.precio_anual,
    };
  }

  async setTherapistPlan(data: TherapistPlansType) {
    const existingPlan = await this.prisma.planesTerapeuta.findUnique({
      where: { id_terapeuta: data.id_terapeuta },
    });

    if (existingPlan) {
      return await this.prisma.planesTerapeuta.update({
        where: { id_terapeuta: data.id_terapeuta },
        data: {
          precio_mensual: data.precio_mensual,
          precio_anual: data.precio_anual,
        },
      });
    }

    return await this.prisma.planesTerapeuta.create({
      data,
    });
  }
}
