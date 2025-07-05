// chat.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody()
    payload: {
      id_emisor: number;
      id_receptor: number;
      mensaje: string;
      visto?: boolean;
    },
  ) {
    const fixedPayload = { ...payload, visto: payload.visto ?? false };
    const saved = await this.chatService.createChat(fixedPayload);
    const room = `chat_${payload.id_emisor}_${payload.id_receptor}`;
    this.server.to(room).emit('new_message', saved);
  }

  @SubscribeMessage('join_chat')
  handleJoinChat(
    @MessageBody()
    data: { id_emisor: number; id_receptor: number },
    client: Socket,
  ) {
    const room = `chat_${data.id_emisor}_${data.id_receptor}`;
    client.join(room);
  }
}
