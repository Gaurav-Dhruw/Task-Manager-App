import { Notification } from 'src/domain/entities';
import { IGenericRepository } from '../abstracts';

export abstract class INotificationRepository
  implements IGenericRepository<Notification>
{
  abstract getAll(): Promise<Notification[]>;
  abstract get(id: string): Promise<Notification>;
  abstract create(item: Notification): Promise<Notification>;
  abstract update(id: string, item: Notification): Promise<Notification>;
  abstract delete(id: string): void;
}
