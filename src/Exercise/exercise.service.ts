import { Temporal } from '@js-temporal/polyfill';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { SupabaseService } from 'src/Supabase/supabase.service';

@Injectable()
export class ExcerciseService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  private getTimeAgo(instant: Temporal.Instant): string {
    const now = Temporal.Now.instant();
    const diff = now.since(instant, { largestUnit: 'hour' });
    if (diff.total('minutes') < 1) return 'Justo ahora';
    if (diff.total('hours') < 1)
      return `Hace ${Math.floor(diff.total('minutes'))} minutos`;
    return `Hace ${Math.floor(diff.total('hours'))} horas`;
  }

  async getAllExcercises() {
    const exercises = await this.prisma.ejercicio.findMany({
      select: {
        id: true,
        nombre: true,
        video_url: true,
        createdAt: true,
      },
    });

    return exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.nombre,
      videoUrl: exercise.video_url,
      timeAgo: this.getTimeAgo(
        Temporal.Instant.from(exercise.createdAt.toISOString()),
      ),
    }));
  }

  async createExcercise(filePath: string, nombre: string) {
    const publicUrl = await this.supabaseService.uploadFile(
      filePath,
      `${nombre}-${Date.now()}.mp4`,
      'videos',
      'videos',
    );

    return await this.prisma.ejercicio.create({
      data: {
        nombre,
        video_url: publicUrl,
      },
    });
  }
}
