import { Comment } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class ICommentRepository
  implements IGenericRepository<Comment>
{
  abstract getAll(options?: {
    task_id?: string;
    user_id?: string;
  }): Promise<Comment[]>;
  abstract getById(id: string): Promise<Comment>;
  abstract create(item: Comment): Promise<Comment>;
  abstract update(id: string, item: Comment): Promise<Comment>;
  abstract delete(id: string): Promise<void>;
}
