import { Comment } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ICommentRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  getById(id: string): Promise<Comment> {
    return this.commentRepository.findOne({
      where: {
        id,
      },

      relations: ['user', 'task'],

      select: {
        id: true,
        content: true,
        user: {
          id: true,
        },
        task: {
          id: true,
        },
      },
    });
  }

  getAll(options?: { task_id: string; user_id: string }): Promise<Comment[]> {
    const { task_id, user_id } = options || {};

    return this.commentRepository.find({
      where: {
        user: {
          id: user_id,
        },
        task: {
          id: task_id,
        },
      },

      order: {
        created_at: 'DESC',
      },
    });
  }

  create(comment: Comment): Promise<Comment> {
    return this.commentRepository.save(comment);
  }

  update(id: string, comment: Comment): Promise<Comment> {
    return this.commentRepository.save(comment);
  }

  async delete(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
