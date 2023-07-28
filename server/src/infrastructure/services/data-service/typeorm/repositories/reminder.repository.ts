import { Reminder } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IReminderRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReminderRepository implements IReminderRepository {
  constructor(
    @InjectRepository(Reminder) ReminderRepository: Repository<Reminder>,
  ) {}

  getById(id: string): Promise<Reminder> {
    return;
  }
  getAll(): Promise<Reminder[]> {
    return;
  }
  create(item: Reminder): Promise<Reminder> {
    return;
  }
  update(id: string, item: Reminder): Promise<Reminder> {
    return;
  }
  delete(id: string): Promise<void> { return}
}
