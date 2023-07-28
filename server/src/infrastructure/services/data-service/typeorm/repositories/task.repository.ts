import { Task } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ITaskRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(@InjectRepository(Task) TaskRepository: Repository<Task>) {}

  getById(id: string): Promise<Task> {
    return;
  }
  getAll(): Promise<Task[]> {
    return;
  }
  create(item: Task): Promise<Task> {
    return;
  }
  update(id: string, item: Task): Promise<Task> {
    return;
  }
  delete(id: string): Promise<void> {
    return;
  }
}
