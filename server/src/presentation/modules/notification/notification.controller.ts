import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { NotificationUseCases } from 'src/application/use-cases/notification/notification.use-cases';
import { Notification, User } from 'src/domain/entities';
import { CustomRequest } from 'src/presentation/common/types';
import { UpdateNotificationResponseDto } from './dtos/update-notification-response.dto';
import { RequestQueryPipe } from 'src/presentation/common/pipes';
import { PaginationDto } from 'src/presentation/common/dtos';

@Controller('user/notification')
export class NotificationController {
  constructor(private readonly notificationUseCases: NotificationUseCases) {}

  @Get('list')
  findAllNotifications(@Req() req: CustomRequest, @Query(RequestQueryPipe) query: PaginationDto): Promise<Notification[]> {
    const requestedUser = new User(req.user);
    return this.notificationUseCases.getAllNotifications(requestedUser.id, query as any);
  }

  @Post()
  createNotification(
    @Req() req: CustomRequest,
    @Body('content') content: string,
  ): Promise<Notification> {
    const notification = new Notification({ content });
    notification.receiver = new User(req.user);

    return this.notificationUseCases.createNotification(notification);
  }

  @Patch(':notification_id/mark-read')
  async markAsRead(
    @Req() req: CustomRequest,
    @Param('notification_id', ParseUUIDPipe) notification_id: string,
  ): Promise<UpdateNotificationResponseDto> {
    const requestUser = new User(req.user);

    const updatedNotification = await this.notificationUseCases.markAsRead(
      notification_id,
      requestUser,
    );

    return new UpdateNotificationResponseDto(updatedNotification);
  }

  @Patch('mark-all-read')
  async markAllAsRead(
    @Req() req: CustomRequest,
  ): Promise<UpdateNotificationResponseDto[]> {
    const updatedNotifications = await this.notificationUseCases.markAllAsRead(
      req.user.id,
    );

    const resp = updatedNotifications.map(notification => new UpdateNotificationResponseDto(notification));

    return resp;
  }

  @Delete(':notification_id')
  async deleteNotification(
    @Req() req: CustomRequest,
    @Param('notification_id', ParseUUIDPipe) notification_id: string,
  ) {
    const requestUser = new User(req.user);
    await this.notificationUseCases.deleteNotification(
      notification_id,
      requestUser,
    );
  }
}
