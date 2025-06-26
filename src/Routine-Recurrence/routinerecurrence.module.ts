import { Module } from "@nestjs/common";
import { RoutineRecurrenceController } from "./routinerecurrence.controller";
import { RoutineRecurrenceService } from "./routinerecurrence.service";
import { PrismaModule } from "src/Prisma/prisma.module";

@Module({
  controllers: [RoutineRecurrenceController],
  providers: [RoutineRecurrenceService],
  exports: [RoutineRecurrenceService],
  imports: [PrismaModule],
})
export class RoutineRecurrenceModule {}