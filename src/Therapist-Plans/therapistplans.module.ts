import { Module } from '@nestjs/common';
import { TherapistPlansService } from './therapistplans.service';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { TherapistPlansController } from './therapistplans.controller';
import { SupabaseModule } from 'src/Supabase/supabase.module';

@Module({
  controllers: [TherapistPlansController],
  providers: [TherapistPlansService],
  exports: [TherapistPlansService],
  imports: [PrismaModule, SupabaseModule],
})
export class TherapistPlansModule {}
