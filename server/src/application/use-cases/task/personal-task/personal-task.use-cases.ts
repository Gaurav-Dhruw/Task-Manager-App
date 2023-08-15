import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Task, User } from 'src/domain/entities';
import { PersonalTaskHelper } from './helpers/personal-task.helper';
import { IRequestQuery } from 'src/domain/types/request-query.type';

@Injectable()
export class PersonalTaskUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: PersonalTaskHelper,
  ) {}

  // Done
  getAssignedTasks(user_id: string, query?: IRequestQuery): Promise<Task[]> {
    const { search = '', pagination, where = {}, sort } = query || {};
    const { page = 1, limit = 10 } = pagination || {};

    return this.dataService.task.getAll({
      where: {
        ...where,
        user_id,
        title: search,
        description: search,
      },
      sort,
      pagination: { page, limit },
    });
  }

  // Done
  async createTask(inputTask: Task, requestUser: User): Promise<Task> {
    inputTask.created_by = requestUser;
    inputTask.assigned_to = [requestUser];
    return this.dataService.task.create(inputTask);
  }

  async getTask(task_id: string, requestUser: User): Promise<Task> {
    const task = await this.dataService.task.getById(task_id);
    // Validate if task exists or not.
    this.helper.validateInput(task);
    // Checks if user is the creator of task.
    this.helper.checkAuthorization(task, requestUser);

    return task;
  }

  // Done
  async updateTask(inputTask: Task, requestUser: User): Promise<Task> {
    const task = await this.dataService.task.getById(inputTask.id);

    // Validate if task exists or not.
    this.helper.validateInput(task);

    // Checks if user is the creator of task.
    this.helper.checkAuthorization(task, requestUser);

    const updatedTask = { ...task, ...inputTask };

    return this.dataService.task.update(task.id, updatedTask);
  }

  //Done
  async deleteTask(task_id: string, requestUser: User): Promise<void> {
    const task = await this.dataService.task.getById(task_id);
    // Validates if task exists or not.
    this.helper.validateInput(task);

    // Checks if user is the creator of task.
    this.helper.checkAuthorization(task, requestUser);

    await this.dataService.task.delete(task_id);
  }
}
