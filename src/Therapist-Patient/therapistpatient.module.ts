import { Module } from '@nestjs/common';
import { TherapistPatientController } from './therapistpatient.controller';
import { TherapistPatientService } from './therapistpatient.service';
import { PrismaModule } from "src/Prisma/prisma.module";

@Module({
    controllers: [TherapistPatientController],
    providers: [TherapistPatientService],
    exports: [TherapistPatientService], // Export the service to be used in other modules
    imports: [PrismaModule], 
})
export class TherapistPatientModule {}
