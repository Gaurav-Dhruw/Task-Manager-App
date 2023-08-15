import { Task } from '../entities';
import { Injectable } from '@nestjs/common';
import { ILike, LessThanOrEqual, Repository } from 'typeorm';
import { ITaskRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';
import { Priority, Status } from 'src/domain/types';
import { RepositoryHelper } from './repository.helper';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly helper: RepositoryHelper,
  ) {}

  getById(id: string): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id },
      relations: {
        created_by: true,
        assigned_to: true,
        team: true,
        comments: true,
        reminders: true,
      },
    });
  }

  getAll(options?: {
    where?: {
      team_id?: string;
      user_id?: string;
      title?: string;
      description?: string;
      status?: Status;
      priority?: Priority;
      deadline?: Date;
    };
    sort?: { deadline?: 'desc' | 'asc' };
    pagination?: { page: number; limit: number };
  }): Promise<Task[]> {
    const { where, sort, pagination } = options || {};
    const {
      team_id,
      user_id,
      title,
      description,
      status,
      priority,
      deadline: where_deadline,
    } = where || {};

    const { deadline: sort_deadline } = sort || {};

    const { page, limit } = pagination || {};

    const queryOptions = {
      where: [
        {
          team_id: { team: { id: team_id } },
          user_id: { assigned_to: { id: user_id } },
          title: { title: ILike(`%${title}%`) },
          status: { status },
          priority: { priority },
          deadline: { deadline: LessThanOrEqual(where_deadline) },
        },
        {
          team_id: { team: { id: team_id } },
          user_id: { assigned_to: { id: user_id } },
          description: { description: ILike(`%${description}%`) },
          status: { status },
          priority: { priority },
          deadline: { deadline: LessThanOrEqual(where_deadline) },
        },
      ],
      sort: {
        deadline: sort_deadline,
      },
      pagination: {
        take: limit,
        skip: (page - 1) * limit,
      },
    };
    // console.log(ILike(''));

    const query = this.helper.buildQuery(options, queryOptions);
    // const filter = {
    //   ...{ title: ILike('%nam%'), description: ILike('%nam%') },
    // };
    console.log(options, query);
    return this.taskRepository.find({
      ...query,
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
