import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { SupabaseService } from 'src/Supabase/supabase.service';
import { ChatType } from './Types/chat.types';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  async createChat(data: ChatType) {
    return await this.prisma.mensajes.create({
      data: {
        id_emisor: data.id_emisor,
        id_receptor: data.id_receptor,
        mensaje: data.mensaje,
        visto: data.visto || false, // Por defecto, el mensaje no está visto
      },
    });
  }

  async getMessages(id_emisor: number, id_receptor: number) {
    return await this.prisma.mensajes.findMany({
      where: {
        OR: [
          { id_emisor, id_receptor },
          { id_emisor: id_receptor, id_receptor: id_emisor },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
