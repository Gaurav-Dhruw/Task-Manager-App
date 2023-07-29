import { Injectable, NotFoundException } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Notification, User } from 'src/domain/entities';
import { NotificationUseCasesHelper } from './notification-use-cases.helper';

@Injectable()
export class NotificationUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: NotificationUseCasesHelper,
  ) {}

  async createNotification(notification: Notification): Promise<Notification> {
    const receiver = await this.dataService.user.getById(
      notification?.receiver?.id,
    );
    if (!receiver) throw new NotFoundException('Receiver Not Found');

    return this.dataService.notification.create(notification);
  }

  async getAllNotifications(user_id: string): Promise<Notification[]> {
    return this.dataService.notification.getAllWhereUser(user_id);
  }

  async markAsRead(id: string, requestedUser: User): Promise<Notification> {
    const resp = await Promise.all([
      await this.dataService.user.getById(requestedUser?.id),
      await this.dataService.notification.getById(id),
    ]);

    const user = resp[0];
    const notification = resp[1];
    this.helper.checkAuthorization(user);
    this.helper.validateOperation(notification, user);

    notification.is_read = true;
    return this.dataService.notification.update(id, notification);
  }

  async markAllAsRead(user_id: string): Promise<Notification[]> {
    const resp = await Promise.all([
      await this.dataService.user.getById(user_id),
      await this.dataService.notification.getAllWhereUser(user_id),
    ]);

    const user = resp[0];
    const notifications = resp[1];

    this.helper.checkAuthorization(user);

    notifications.forEach((notification) => {
      notification.is_read = true;
    });

    return this.dataService.notification.updateAll(notifications);
  }

  async deleteNotification(id: string, requestedUser: User): Promise<void> {
    const resp = await Promise.all([
      await this.dataService.user.getById(requestedUser?.id),
      await this.dataService.notification.getById(id),
    ]);

    const user = resp[0];
    const notification = resp[1];

    this.helper.validateOperation(notification, user);

    await this.dataService.notification.delete(id);
  }
}
