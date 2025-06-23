import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';
import { TherapistPatientModule } from './Therapist-Patient/therapistpatient.module';

@Module({
  imports: [UsersModule, AuthModule, TherapistPatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
