import { Reminder } from 'src/domain/entities';
import { IGenericRepository } from '../abstracts';

export abstract class IReminderRepository
  implements IGenericRepository<Reminder>
{
  abstract getAll(): Promise<Reminder[]>;
  abstract get(id: string): Promise<Reminder>;
  abstract create(item: Reminder): Promise<Reminder>;
  abstract update(id: string, item: Reminder): Promise<Reminder>;
  abstract delete(id: string): void;
}
