import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ExcerciseType } from './Types/exercise.types';

@Injectable()
export class ExcerciseService {
  constructor(private prisma: PrismaService) {}

  async createExcercise(data: ExcerciseType) {
    return await this.prisma.ejercicio.create({
      data: {
        nombre: data.nombre,
        video_url: data.video_url
      },
    });
  }
}
