import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IAppNotificationService, ITokenService } from 'src/domain/abstracts';
import { Notification } from 'src/domain/entities';
import { ITokenPayload } from 'src/domain/types';

interface CustomSocket extends Socket {
  user: ITokenPayload;
}
@WebSocketGateway()
@Injectable()
export class AppNotificationService
  implements
    IAppNotificationService,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit
{
  @WebSocketServer()
  private io: Server;

  constructor(private readonly tokenService: ITokenService) {}

  
  afterInit(io: Server) {
    // Socket Middleware for Authentication.
    this.io.use((socket: CustomSocket, next) => {
      try {
        const { token } = socket.handshake.auth;

        if (!token) throw new WsException('Access Token Not Present');

        const user = this.tokenService.decodeToken(token);
        if (!user || !user.id) throw new WsException('Invalid Token');

        socket.user = user;
        next();
      } catch (err) {
        next(err);
      }
    });
  }

  // After connection is established, adds the user to the room.
  handleConnection(socket: CustomSocket) {
    // console.log(socket.user, `connected`);
    socket.join(socket.user.id);
  }

  handleDisconnect(socket: Socket) {
    // console.log(`${socket.id} diconnected`);
  }

  // Emits notification
  async sendNotifications(notifications: Notification[]): Promise<void> {
    notifications.forEach((notification) => {
      this.io.to(notification.receiver?.id).emit('notification', notification);
    });
  }
}
