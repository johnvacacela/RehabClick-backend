import { Module } from "@nestjs/common";
import { ExerciseRoutineController } from "./exerciseroutine.controller";
import { ExerciseRoutineService } from "./exerciseroutine.service";
import { PrismaModule } from "src/Prisma/prisma.module";

@Module({
  controllers: [ExerciseRoutineController],
  providers: [ExerciseRoutineService],
  exports: [ExerciseRoutineService],
  imports: [PrismaModule],
})
export class ExerciseRoutineModule {}