import { Comment } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ICommentRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryHelper } from './repository.helper';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly helper : RepositoryHelper,
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

 getAll(options?: { where?: { task_id?: string; user_id?: string; }; sort?: { created_at?: 'desc' | 'asc'; }; pagination?: { page: number; limit: number; }; }): Promise<Comment[]> {

      const {where, sort, pagination} = options || {};
      const {task_id, user_id} = where || {};
      const {created_at} = sort || {};
      const {page=1, limit=10} = pagination || {};

      const queryOptions:any = {
        where:{
          task_id : {task:{id:task_id}},
          user_id :{user:{id:user_id}},
        },
        sort:{
          created_at,
        },
        pagination:{
          take: limit,
          skip: (page-1)*limit,
        }
      }

      const query = this.helper.buildQuery(options, queryOptions);

     return this.commentRepository.find({...query, relations:['user']});
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
