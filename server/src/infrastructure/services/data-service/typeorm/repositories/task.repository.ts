import { Task } from '../entities';
import { Injectable } from '@nestjs/common';
import { LessThanOrEqual, Repository } from 'typeorm';
import { ITaskRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority, Status } from 'src/domain/types';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  getById(id: string): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['assigned_to', 'created_by', 'team', 'comments', 'reminders'],
    });
  }


  getAll(options?:{user_id?: string, title?:string, status?:Status, priority?:Priority, deadline?:Date}): Promise<Task[]> {

    const {
      user_id,
      title,
      status,
      priority,
      deadline,
    } = options || {};

    return this.taskRepository.find({
      where: { 
        title,
        assigned_to: { 
          id: user_id 
        },
        status,
        priority,
        deadline: LessThanOrEqual(deadline)
      },
    });
  }

  create(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  update(id: string, task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }
  
  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
