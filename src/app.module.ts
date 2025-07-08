import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';
import { TherapistPatientModule } from './Therapist-Patient/therapistpatient.module';
import { RoutineModule } from './Routine/routine.module';
import { ExerciseModule } from './Exercise/exercise.module';
import { ExerciseRoutineModule } from './Exercise-Routine/exerciseroutine.module';
import { RoutineRecurrenceModule } from './Routine-Recurrence/routinerecurrence.module';
import { TherapistPlansModule } from './Therapist-Plans/therapistplans.module';
import { ChatModule } from './Chat/chat.module';
import { AppointmentModule } from './Appointments/appointment.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TherapistPatientModule,
    RoutineModule,
    ExerciseModule,
    ExerciseRoutineModule,
    RoutineRecurrenceModule,
    TherapistPlansModule,
    ChatModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
