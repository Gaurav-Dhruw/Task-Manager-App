import { Reminder } from '../entities';
import { Injectable } from '@nestjs/common';
import { Between, In, Repository } from 'typeorm';
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

  getAll(options?:{task_id?:string, between ?:{start:Date, end:Date}}): Promise<Reminder[]> {

    const {task_id, between:{start, end}} = options || {};

    return this.reminderRepository.find({ 
      where:{
        task:{id:task_id},
        scheduled_for: Between(start,end),
      },
      relations: ['receivers', 'task'] 
    });
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

  async deleteMany(ids:string[]): Promise<void> {
    await this.reminderRepository.delete(ids);
  }
}
