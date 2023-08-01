import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Task, Team, User } from 'src/domain/entities';
import { TeamTaskHelper } from './helpers/team-task.helper';

@Injectable()
export class TeamTaskUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: TeamTaskHelper,
  ) {}

  // Done
  async createTask(inputTask: Task, requestUser: User): Promise<Task> {
    const team = await this.dataService.team.getById(inputTask.team.id);
    // Checks the team actually exists or not.
    this.helper.validateCreateInput(team);
    // Checks if user is a memeber or not
    this.helper.checkAuthorization(team, requestUser);

    inputTask.created_by = requestUser;
    return this.dataService.task.create(inputTask);
  }

  // Done
  getTasks(user_id: string): Promise<Task[]> {
    return this.dataService.task.getAllWhereUser(user_id);
  }

  // Done
  async updateTask(inputTask: Task, requestUser: User): Promise<Task> {
    const task = await this.dataService.task.getById(inputTask.id);

    // Validate team task.
    this.helper.validateInput(task);

    const team = await this.dataService.team.getById(task.team.id);
    // Checks for required authorization.
    this.helper.checkAuthorization(team, requestUser);

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
    // Validate team task.
    this.helper.validateInput(task);

    const team = await this.dataService.team.getById(task.team.id);
    //Checks if user is team member.
    this.helper.checkAuthorization(team, requestUser);
    // Checks if the user is either an admin or task creator.
    this.helper.checkSpecialAuthorization(task, team, requestUser);

    // Checks if the provided users are team members or not.
    this.helper.checkIfTeamMembers(team, assign);

    const newAssignedList = this.helper.mergeUsersList(
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
    // Validate team task.
    this.helper.validateInput(task);

    const team = await this.dataService.team.getById(task.team.id);
    //Checks if user is team member.
    this.helper.checkAuthorization(team, requestUser);
    // Checks if the user is either an admin or task creator.
    this.helper.checkSpecialAuthorization(task, team, requestUser);

    // Checks if the provided users are team members or not.
    this.helper.checkIfTeamMembers(team, unassign);

    const newAssignedList = this.helper.filterUsersList(
      task.assigned_to,
      unassign,
    );

    task.assigned_to = newAssignedList;
    return this.dataService.task.update(id, task);
  }

  //Done
  async deleteTask(id: string, requestUser: User): Promise<void> {
    const task = await this.dataService.task.getById(id);
    // Validate team task.
    this.helper.validateInput(task);

    const team = await this.dataService.team.getById(task.team.id);
    //Checks if user is team member.
    this.helper.checkAuthorization(team, requestUser);
    //Checks if the user is either an admin or task creator
    this.helper.checkSpecialAuthorization(task, team, requestUser);

    await this.dataService.task.delete(id);
  }
}
