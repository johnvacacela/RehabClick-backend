import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { SupabaseService } from 'src/Supabase/supabase.service';

@Injectable()
export class ExcerciseService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

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
