import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { SupabaseModule } from 'src/Supabase/supabase.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [ChatService],
  imports: [PrismaModule, SupabaseModule],
})
export class ChatModule {}
