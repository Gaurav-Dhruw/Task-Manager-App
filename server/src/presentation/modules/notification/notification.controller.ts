import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req } from '@nestjs/common';
import { NotificationUseCases } from 'src/application/use-cases/notification/notification.use-cases';
import { Notification, User } from 'src/domain/entities';
import { CustomRequest } from 'src/presentation/common/types';

@Controller('user/notification')
export class NotificationController {
  constructor(private readonly notificationUseCases: NotificationUseCases) {}

  @Get()
  findAllNotifications(@Req() req: CustomRequest): Promise<Notification[]> {
    const requestedUser = new User(req.user);
    return this.notificationUseCases.getAllNotifications(requestedUser.id);
  }

  @Post()
  createNotification(@Req() req: CustomRequest, @Body('content') content:string): Promise<Notification> {
    const notification = new Notification({content});
    notification.receiver = new User(req.user);

    return this.notificationUseCases.createNotification(notification);
  }

  @Patch(':notification_id/mark-read')
  markAsRead(
    @Req() req: CustomRequest,
    @Param('notification_id', ParseUUIDPipe) notification_id: string,
  ): Promise<Notification> {
    const requestUser = new User(req.user);
    return this.notificationUseCases.markAsRead(notification_id, requestUser);
  }

  @Patch('mark-all-read')
  markAllAsRead(@Req() req: CustomRequest): Promise<Notification[]> {
    return this.notificationUseCases.markAllAsRead(req.user.id);
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


