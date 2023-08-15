import { Task } from 'src/domain/entities';
import { IGenericRepository } from '.';
import { Priority, Status } from 'src/domain/types';

export abstract class ITaskRepository implements IGenericRepository<Task> {
  abstract getAll(options?: {
    where?: {
      team_id?: string;
      user_id?: string;
      title?: string;
      description?: string;
      status?: Status;
      priority?: Priority;
      deadline?: Date;
    };
    sort?: {
      deadline?: 'desc' | 'asc';
    };
    pagination?: {
      page: number;
      limit: number;
    };
  }): Promise<Task[]>;

  abstract getById(task_id: string): Promise<Task>;
  abstract create(task: Task): Promise<Task>;
  abstract update(task_id: string, task: Task): Promise<Task>;
  abstract delete(task_id: string): Promise<void>;
}
