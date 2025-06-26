import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';
import { TherapistPatientModule } from './Therapist-Patient/therapistpatient.module';
import { RoutineModule } from './Routine/routine.module';
import { ExerciseModule } from './Exercise/exercise.module';
import { ExerciseRoutineModule } from './Exercise-Routine/exerciseroutine.module';
import { RoutineRecurrenceModule } from './Routine-Recurrence/routinerecurrence.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TherapistPatientModule,
    RoutineModule,
    ExerciseModule,
    ExerciseRoutineModule,
    RoutineRecurrenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
