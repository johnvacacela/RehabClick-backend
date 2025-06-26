import { Module } from '@nestjs/common';
import { TherapistPatientController } from './therapistpatient.controller';
import { TherapistPatientService } from './therapistpatient.service';
import { PrismaModule } from 'src/Prisma/prisma.module';

@Module({
  controllers: [TherapistPatientController],
  providers: [TherapistPatientService],
  exports: [TherapistPatientService],
  imports: [PrismaModule],
})
export class TherapistPatientModule {}
