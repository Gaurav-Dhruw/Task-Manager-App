import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Req } from '@nestjs/common';
import { NotificationUseCases } from 'src/application/use-cases/notification/notification.use-cases';
import { Notification, User } from 'src/domain/entities';
import { CustomRequest } from 'src/presentation/common/types';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationUseCases: NotificationUseCases) {}

  @Get()
  getAllNotifications(@Req() req: CustomRequest): Promise<Notification[]> {
    const requestedUser = new User(req.user);
    return this.notificationUseCases.getAllNotifications(requestedUser.id);
  }

  @Patch(':id/read')
  markAsRead(
    @Req() req: CustomRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Notification> {
    const requestedUser = new User(req.user);
    return this.notificationUseCases.markAsRead(id, requestedUser);
  }

  @Patch('read-all')
  markAllAsRead(
    @Req() req: CustomRequest,
  ): Promise<Notification[]> {
    const requestedUser = new User(req.user);
    return this.notificationUseCases.markAllAsRead(requestedUser.id);
  }

  @Delete(':id')
  async deleteNotification(
    @Req() req: CustomRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const requestedUser = new User(req.user);
    await this.notificationUseCases.deleteNotification(id, requestedUser);
    return { message: `Notification with id: ${id} deleted` };
  }
}
