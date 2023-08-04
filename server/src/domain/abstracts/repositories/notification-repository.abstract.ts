import { Notification } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class INotificationRepository
  implements IGenericRepository<Notification>
{
  abstract getById(id: string): Promise<Notification>;
  abstract getAll(options?: {
    user_id?: string;
    is_read?: boolean;
  }): Promise<Notification[]>;
  abstract create(item: Notification): Promise<Notification>;
  abstract createMany(items: Notification[]): Promise<Notification[]>;

  abstract update(id: string, item: Notification): Promise<Notification>;
  abstract updateMany(item: Notification[]): Promise<Notification[]>;
  abstract delete(id: string): Promise<void>;
}
