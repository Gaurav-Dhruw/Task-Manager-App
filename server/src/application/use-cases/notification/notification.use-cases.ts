import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Notification, User } from 'src/domain/entities';
import { NotificationUseCasesHelper } from './helpers/notification-use-cases.helper';
import { IRequestQuery } from 'src/domain/types/request-query.type';

@Injectable()
export class NotificationUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: NotificationUseCasesHelper,
  ) {}
  //Done
  async createNotification(notification: Notification): Promise<Notification> {
    return this.dataService.notification.create(notification);
  }

  //Done
  async createNotifications(
    notifications: Notification[],
  ): Promise<Notification[]> {
    return this.dataService.notification.createMany(notifications);
  }

  //Done
  async getAllNotifications(
    user_id: string,
    query?: IRequestQuery,
  ): Promise<Notification[]> {
    const { page = 1, limit = 10 } = query?.pagination || {};

    return this.dataService.notification.getAll({
      where: { user_id },
      sort: { created_at: 'desc' },
      pagination: { page, limit },
    });
  }

  //Done
  async markAsRead(
    notification_id: string,
    requestUser: User,
  ): Promise<Notification> {
    const notification = await this.dataService.notification.getById(
      notification_id,
    );

    // Checks if notification exists.
    this.helper.validateInput(notification);

    // Checks if the notification belongs to the usern
    this.helper.checkAuthorization(notification, requestUser);

    this.helper.validateMarkReadOperation(notification);

    notification.is_read = true;
    return this.dataService.notification.update(notification_id, notification);
  }

  // Needs operation check.
  async markAllAsRead(user_id: string): Promise<Notification[]> {
    const notifications = await this.dataService.notification.getAll({
      where: { user_id, is_read: false },
      sort: {
        created_at: 'desc',
      },
    });

    this.helper.validateMarkAllReadOperation(notifications);

    notifications.forEach((notification) => {
      notification.is_read = true;
    });

    return this.dataService.notification.updateMany(notifications);
  }

  //Done
  async deleteNotification(
    notification_id: string,
    requestUser: User,
  ): Promise<void> {
    const notification = await this.dataService.notification.getById(
      notification_id,
    );

    // Checks if notification exists.
    this.helper.validateInput(notification);

    // Checks if the notificatio belongs to the usern
    this.helper.checkAuthorization(notification, requestUser);

    await this.dataService.notification.delete(notification_id);
  }
}
