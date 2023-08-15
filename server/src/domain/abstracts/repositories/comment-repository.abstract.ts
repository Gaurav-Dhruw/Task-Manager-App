import { Comment } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class ICommentRepository
  implements IGenericRepository<Comment>
{
  abstract getAll(options?: {
    where?: { task_id?: string; user_id?: string };
    sort?: {
      created_at?: 'desc' | 'asc';
    };
    pagination?: { page: number; limit: number };
  }): Promise<Comment[]>;

  abstract getById(comment_id: string): Promise<Comment>;
  abstract create(comment: Comment): Promise<Comment>;
  abstract update(comment_id: string, item: Comment): Promise<Comment>;
  abstract delete(comment_id: string): Promise<void>;
}
