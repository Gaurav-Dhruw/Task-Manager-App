import { Task } from 'src/domain/entities';
import { IGenericRepository } from '.';
import { Priority, Status } from 'src/domain/types';

export abstract class ITaskRepository implements IGenericRepository<Task> {
  abstract getAll(options?:{user_id?: string, status?:Status, priority?:Priority,deadline?:Date}): Promise<Task[]>;
  abstract getById(id: string): Promise<Task>;
  abstract create(item: Task): Promise<Task>;
  abstract update(id: string, item: Task): Promise<Task>;
  abstract delete(id: string): Promise<void>;
}
