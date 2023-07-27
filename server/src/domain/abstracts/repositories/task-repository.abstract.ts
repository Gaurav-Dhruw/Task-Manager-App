import { Task } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class ITaskRepository implements IGenericRepository<Task> {
  abstract getAll(): Promise<Task[]>;
  abstract getById(id: string): Promise<Task>;
  abstract create(item: Task): Promise<Task>;
  abstract update(id: string, item: Task): Promise<Task>;
  abstract delete(id: string): void;
}
