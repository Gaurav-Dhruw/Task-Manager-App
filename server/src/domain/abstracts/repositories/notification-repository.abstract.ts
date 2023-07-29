import { Notification } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class INotificationRepository
  implements IGenericRepository<Notification>
{
  abstract getById(id: string): Promise<Notification>;
  abstract getAll(): Promise<Notification[]>;
  abstract getAllWhereUser(user_id: string): Promise<Notification[]>;

  abstract create(item: Notification): Promise<Notification>;
  abstract update(id: string, item: Notification): Promise<Notification>;
  abstract updateAll(item: Notification[]): Promise<Notification[]>;
  abstract delete(id: string): Promise<void>;
}
