import { Comment } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ICommentRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectRepository(Comment) CommentRepository: Repository<Comment>,
  ) {}

  getById(id: string): Promise<Comment> {
    return;
  }
  getAll(): Promise<Comment[]> {
    return;
  }
  create(item: Comment): Promise<Comment> {
    return;
  }
  update(id: string, item: Comment): Promise<Comment> {
    return;
  }
  delete(id: string): void {}
}
