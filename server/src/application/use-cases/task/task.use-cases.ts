import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Task, User } from 'src/domain/entities';
import { TaskUseCasesHelper } from './task-use-cases.helper';

@Injectable()
export class TaskUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: TaskUseCasesHelper,
  ) {}

  async createTask(taskInput: Task, requestUser: User): Promise<Task> {
    const foundTeam = taskInput?.team
      ? await this.dataService.team.getById(taskInput.team.id)
      : null;

    this.helper.validateCreateOperation(taskInput.team, foundTeam, requestUser);
    this.helper.checkCreateAuthorization(foundTeam, requestUser);

    taskInput.created_by = requestUser;
    if (!taskInput.team) taskInput.assigned_to = [requestUser];

    return this.dataService.task.create(taskInput);
  }

  getTasks(user_id: string): Promise<Task[]> {
    return this.dataService.task.getAllWhereUser(user_id);
  }

  async updateTask(taskInput: Task, requestUser: User): Promise<Task> {
    const task = await this.dataService.task.getById(taskInput.id);
    this.helper.validateMutateOperation(task, requestUser);

    const team = task?.team
      ? await this.dataService.team.getById(taskInput.team.id)
      : null;

    this.helper.checkMutateAuthorization(team, requestUser, task);

    return this.dataService.task.update(taskInput.id, taskInput);
  }

  async assignTask(
    id: string,
    assign: User[],
    requestUser: User,
  ): Promise<Task> {
    const task = await this.dataService.task.getById(id);
    this.helper.validateMutateOperation(task, requestUser);

    const team = await this.dataService.team.getById(task.team.id);

    this.helper.checkMutateAuthorization(team, requestUser, task);
    this.helper.areTeamMembers(team, assign);

    const teamMembersOnly = this.helper.filterUsersList(assign, team.members);
    const newAssignedList = this.helper.mergeUsersList(
      task.assigned_to,
      teamMembersOnly,
    );

    task.assigned_to = newAssignedList;
    return this.dataService.task.update(id, task);
  }

  async unassignTask(
    id: string,
    unassign: User[],
    requestUser: User,
  ): Promise<Task> {
    const task = await this.dataService.task.getById(id);
    this.helper.validateMutateOperation(task, requestUser);

    const team = await this.dataService.team.getById(task.team.id);

    this.helper.checkMutateAuthorization(team, requestUser, task);
    this.helper.areTeamMembers(team, unassign);

    const newAssignedList = this.helper.filterUsersList(
      task.assigned_to,
      unassign,
    );
    task.assigned_to = newAssignedList;

    return this.dataService.task.update(id, task);
  }

  async deleteTask(id: string, requestUser: User): Promise<void> {
    const task = await this.dataService.task.getById(id);
    this.helper.validateMutateOperation(task, requestUser);

    const team = task?.team
      ? await this.dataService.team.getById(task.team.id)
      : null;

    this.helper.checkMutateAuthorization(team, requestUser, task);

    await this.dataService.task.delete(id);
  }
}
