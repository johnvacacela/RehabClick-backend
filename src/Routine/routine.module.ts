import { Module } from '@nestjs/common';
import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';
import { PrismaModule } from 'src/Prisma/prisma.module';

@Module({
  controllers: [RoutineController],
  providers: [RoutineService],
  exports: [RoutineService],
  imports: [PrismaModule],
})
export class RoutineModule {}
