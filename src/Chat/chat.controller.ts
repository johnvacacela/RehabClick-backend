import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('get/:id_emisor/:id_receptor')
  async getMessages(
    @Res() res: any,
    @Param('id_emisor') id_emisor: number,
    @Param('id_receptor') id_receptor: number,
  ) {
    try {
      const messages = await this.chatService.getMessages(
        Number(id_emisor),
        Number(id_receptor),
      );
      return res.status(200).json({
        status: 200,
        message: 'Mensajes obtenidos correctamente',
        messages,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al obtener los mensajes',
        error: error.message,
      });
    }
  }

  @Get('getLastMessage/:id')
  async getLastMessage(@Res() res: any, @Param('id') id: number) {
    try {
      const lastMessage =
        await this.chatService.getLastMessageByUserWithAllOtherChats(
          Number(id),
        );
      return res.status(200).json({
        status: 200,
        message: 'Último mensaje obtenido correctamente',
        lastMessage,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error al obtener el último mensaje',
        error: error.message,
      });
    }
  }
}
