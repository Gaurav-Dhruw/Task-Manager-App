import { Notification } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class INotificationRepository
  implements IGenericRepository<Notification>
{
  abstract getById(notification_id: string): Promise<Notification>;

  abstract getAll(options?: {
    where?: {
      user_id?: string;
      is_read?: boolean;
    };
    sort?: {
      created_at?: 'desc' | 'asc';
    };
    pagination?: { page: number; limit: number };
  }): Promise<Notification[]>;

  abstract create(notification: Notification): Promise<Notification>;
  abstract createMany(notifications: Notification[]): Promise<Notification[]>;

  abstract update(
    notification_id: string,
    notification: Notification,
  ): Promise<Notification>;

  abstract updateMany(notifications: Notification[]): Promise<Notification[]>;
  abstract delete(notification_id: string): Promise<void>;
}
