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

  async getLastMessageByUserWithAllOtherChats(id_emisor: number) {
    // Trae todos los mensajes donde el usuario es emisor o receptor
    const mensajes = await this.prisma.mensajes.findMany({
      where: {
        OR: [{ id_emisor }, { id_receptor: id_emisor }],
      },
      orderBy: {
        createdAt: 'desc', // Ordena por fecha descendente
      },
      include: {
        emisor: {
          include: {
            datosExtraPaciente: true, // Incluye los datos extra del paciente
            datosExtraTerapeuta: true, // Incluye los datos extra del terapeuta
          },
        },
        receptor: {
          include: {
            datosExtraPaciente: true, // Incluye los datos extra del paciente
            datosExtraTerapeuta: true, // Incluye los datos extra del terapeuta
          },
        },
      }
    });

    // Agrupa por el otro participante y toma el último mensaje de cada chat
    const chatsMap = new Map<number, any>();

    for (const msg of mensajes) {
      // El otro usuario es el receptor si yo soy el emisor, o el emisor si yo soy el receptor
      const otherUser =
        msg.id_emisor === id_emisor ? msg.id_receptor : msg.id_emisor;
      if (!chatsMap.has(otherUser)) {
        chatsMap.set(otherUser, msg); // El primero será el más reciente por el ordenamiento
      }
    }

    // Devuelve un array con el último mensaje de cada chat
    return Array.from(chatsMap.values());
  }
}
