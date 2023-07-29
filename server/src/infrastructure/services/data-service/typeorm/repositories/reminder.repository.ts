import { Reminder } from '../entities';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { IReminderRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReminderRepository implements IReminderRepository {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
  ) {}

  getById(id: string): Promise<Reminder> {
    return this.reminderRepository.findOne({
      where: { id },
      relations: ['receivers', 'task'],
    });
  }

  getAll(): Promise<Reminder[]> {
    return this.reminderRepository.find({ relations: ['receivers', 'task'] });
  }
  create(reminder: Reminder): Promise<Reminder> {
    return this.reminderRepository.save(reminder);
  }
  update(id: string, reminder: Reminder): Promise<Reminder> {
    return this.reminderRepository.save(reminder);
  }
  async delete(id: string): Promise<void> {
    await this.reminderRepository.delete(id);
  }
}
