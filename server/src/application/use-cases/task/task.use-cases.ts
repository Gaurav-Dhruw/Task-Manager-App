import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Task, User } from 'src/domain/entities';
import { TaskUseCasesHelper } from './task-use-cases.helper';
import { CommonUseCasesHelper } from 'src/application/helpers/use-cases.helper';

@Injectable()
export class TaskUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly commonHelper: CommonUseCasesHelper,
    private readonly helper: TaskUseCasesHelper,
  ) {}

  // Done
  async createTask(inputTask: Task, requestUser: User): Promise<Task> {
    const team = inputTask?.team?.id
      ? await this.dataService.team.getById(inputTask.team.id)
      : null;

    this.helper.validateCreateOperation(inputTask.team, team);
    this.helper.checkCreateAuthorization(team, requestUser);

    inputTask.created_by = requestUser;
    if (!inputTask.team) inputTask.assigned_to = [requestUser];

    return this.dataService.task.create(inputTask);
  }

  // Done
  getTasks(user_id: string): Promise<Task[]> {
    return this.dataService.task.getAllWhereUser(user_id);
  }

  // Done
  async updateTask(inputTask: Task, requestUser: User): Promise<Task> {
    const task = await this.dataService.task.getById(inputTask.id);
    this.helper.validateOperation(task);

    const team = task?.team
      ? await this.dataService.team.getById(task.team.id)
      : null;

    this.helper.checkMutateAuthorization(team, requestUser, task);
    const updatedTask = { ...task, ...inputTask };

    return this.dataService.task.update(task.id, updatedTask);
  }

  // Done
  async assignTask(
    id: string,
    assign: User[],
    requestUser: User,
  ): Promise<Task> {
    const task = await this.dataService.task.getById(id);
    const team = task?.team
      ? await this.dataService.team.getById(task?.team.id)
      : null;

    this.helper.checkMutateAuthorization(team, requestUser, task);
    this.helper.validateAssignmentOperation(task);
    this.commonHelper.areTeamMembers(team, assign);

    // const teamMembersOnly = this.helper.filterUsersList(assign, team.members);
    const newAssignedList = this.commonHelper.mergeUsersList(
      task.assigned_to,
      assign,
    );

    task.assigned_to = newAssignedList;
    return this.dataService.task.update(id, task);
  }

  // Done
  async unassignTask(
    id: string,
    unassign: User[],
    requestUser: User,
  ): Promise<Task> {
    const task = await this.dataService.task.getById(id);
    const team = task?.team
      ? await this.dataService.team.getById(task?.team.id)
      : null;

    this.helper.checkMutateAuthorization(team, requestUser, task);
    this.helper.validateAssignmentOperation(task);
    this.commonHelper.areTeamMembers(team, unassign);

    const newAssignedList = this.commonHelper.filterUsersList(
      task.assigned_to,
      unassign,
    );

    task.assigned_to = newAssignedList;
    console.log({unassign,newAssignedList,assigned_to:task.assigned_to});
    return this.dataService.task.update(id, task);
  }

  //Done
  async deleteTask(id: string, requestUser: User): Promise<void> {
    const task = await this.dataService.task.getById(id);
    this.helper.validateOperation(task);

    const team = task?.team
      ? await this.dataService.team.getById(task.team.id)
      : null;

    this.helper.checkMutateAuthorization(team, requestUser, task);

    await this.dataService.task.delete(id);
  }
}
