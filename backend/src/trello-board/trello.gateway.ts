import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TrelloGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinBoard')
  handleJoinBoard(
    @ConnectedSocket() client: Socket,
    @MessageBody() boardId: number,
  ) {
    client.join(`board_${boardId}`);
    console.log(`Client ${client.id} joined board_${boardId}`);
  }

  @SubscribeMessage('cardMoved')
  handleCardMoved(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { boardId: number; cardId: number; newListId: number; newPosition: number },
  ) {
    // Phát (broadcast) sự kiện cho tất cả client TRONG CÙNG 1 BOARD, NGOẠI TRỪ client vừa gửi lệnh.
    client.to(`board_${payload.boardId}`).emit('cardMovedToClient', payload);
  }
}
