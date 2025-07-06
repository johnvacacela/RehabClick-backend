import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket, // <-- importa esto
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  // Función helper para crear room consistente
  private createRoomId(userId1: number, userId2: number): string {
    const [smaller, bigger] = [userId1, userId2].sort((a, b) => a - b);
    return `chat_${smaller}_${bigger}`;
  }

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
    console.log(
      `New message from ${payload.id_emisor} to ${payload.id_receptor}: ${payload.mensaje}`,
    );

    const fixedPayload = { ...payload, visto: payload.visto ?? false };
    const saved = await this.chatService.createChat(fixedPayload);

    // CORRECCIÓN: Usar room consistente
    const room = this.createRoomId(payload.id_emisor, payload.id_receptor);
    console.log(`📡 Emitiendo a room: ${room}`);

    this.server.to(room).emit('new_message', saved);
  }

  @SubscribeMessage('join_chat')
  handleJoinChat(
    @MessageBody() data: { id_emisor: number; id_receptor: number },
    @ConnectedSocket() client: Socket,
  ) {
    // CORRECCIÓN: Usar room consistente
    const room = this.createRoomId(data.id_emisor, data.id_receptor);
    console.log(`🏠 Cliente ${client.id} uniéndose a room: ${room}`);

    client.join(room);
  }
}
