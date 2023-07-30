import { Task } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ITaskRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  getById(id: string): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['assigned_to', 'created_by', 'team', 'comments'],
    });
  }
  getAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }
  
  getAllWhereUser(user_id: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { assigned_to: { id: user_id } },
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
