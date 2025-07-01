import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExcerciseService } from './exercise.service';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { SupabaseModule } from 'src/Supabase/supabase.module';

@Module({
  controllers: [ExerciseController],
  providers: [ExcerciseService],
  exports: [ExcerciseService],
  imports: [PrismaModule, SupabaseModule],
})
export class ExerciseModule {}