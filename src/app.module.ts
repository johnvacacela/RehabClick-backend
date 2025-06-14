import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
