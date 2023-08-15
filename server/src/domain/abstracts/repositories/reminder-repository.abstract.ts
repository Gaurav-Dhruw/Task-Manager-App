import { Reminder } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class IReminderRepository implements IGenericRepository<Reminder> {
  abstract getAll(options?: {
    where?: { task_id?: string; user_id?: string; scheduled_for?: Date };
    sort?: {
      scheduled_for?: 'desc' | 'asc';
    };
    pagination?: { page: number; limit: number };
  }): Promise<Reminder[]>;

  abstract getById(reminder_id: string): Promise<Reminder>;
  abstract create(reminder: Reminder): Promise<Reminder>;
  abstract update(reminder_id: string, reminder: Reminder): Promise<Reminder>;
  abstract delete(reminder_id: string): Promise<void>;
  abstract deleteMany(reminder_ids: string[]): Promise<void>;
}
