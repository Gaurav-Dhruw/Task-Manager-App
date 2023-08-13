import { Reminder } from '../entities';
import { Injectable } from '@nestjs/common';
import { LessThanOrEqual, Repository } from 'typeorm';
import { IReminderRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryHelper } from './repository.helper';

@Injectable()
export class ReminderRepository implements IReminderRepository {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
    private readonly helper: RepositoryHelper,
  ) {}

  getById(reminder_id: string): Promise<Reminder> {
    return this.reminderRepository.findOne({
      where: { id: reminder_id },
      relations: ['receivers', 'task'],
    });
  }

  getAll(options?: {
    where?: { task_id?: string; user_id?: string; scheduled_for?: Date };
    sort?: { scheduled_for?: 'desc' | 'asc' };
    pagination?: { page: number; limit: number };
  }): Promise<Reminder[]> {
    const { where, sort, pagination } = options || {};
    const {
      user_id,
      task_id,
      scheduled_for: where_scheduled_for,
    } = where || {};
    const { scheduled_for: sort_scheduled_for } = sort || {};
    const { page = 1, limit = 10 } = pagination || {};

    const queryOptions = {
      where: {
        user_id: { receivers: { id: user_id } },
        task_id: { task: { id: task_id } },
        scheduled_for: LessThanOrEqual(where_scheduled_for),
      },
      sort: {
        scheduled_for: sort_scheduled_for,
      },
      pagination: {
        take: limit,
        skip: (page - 1) * limit,
      },
    };

    const query = this.helper.buildQuery(options, queryOptions);

    return this.reminderRepository.find({
      where: {
        task: { id: task_id },
        receivers: { id: user_id },
      },
      relations: ['receivers', 'task'],
    });
  }
  create(reminder: Reminder): Promise<Reminder> {
    return this.reminderRepository.save(reminder);
  }
  update(reminder_id: string, reminder: Reminder): Promise<Reminder> {
    return this.reminderRepository.save(reminder);
  }
  async delete(reminder_id: string): Promise<void> {
    await this.reminderRepository.delete(reminder_id);
  }

  async deleteMany(reminder_ids: string[]): Promise<void> {
    await this.reminderRepository.delete(reminder_ids);
  }
}
