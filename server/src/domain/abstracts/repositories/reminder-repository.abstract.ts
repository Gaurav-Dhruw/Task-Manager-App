import { Reminder } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class IReminderRepository
  implements IGenericRepository<Reminder>
{
  abstract getAll(options?:{task_id?:string, user_id?:string}): Promise<Reminder[]>;
  abstract getById(id: string): Promise<Reminder>;
  abstract create(item: Reminder): Promise<Reminder>;
  abstract update(id: string, item: Reminder): Promise<Reminder>;
  abstract delete(id: string): Promise<void>;
  abstract deleteMany(ids:string[]):Promise<void>;
}
