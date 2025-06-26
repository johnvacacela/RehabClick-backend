import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';
import { TherapistPatientModule } from './Therapist-Patient/therapistpatient.module';
import { RoutineModule } from './Routine/routine.module';
import { ExerciseModule } from './Exercise/exercise.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TherapistPatientModule,
    RoutineModule,
    ExerciseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
