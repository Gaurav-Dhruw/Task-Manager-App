import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Task, Team, User } from 'src/domain/entities';
import { TaskUseCasesHelper } from './helpers/task-use-cases.helper';

@Injectable()
export class TaskUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: TaskUseCasesHelper,
  ) {}

  // Done
  async createTask(inputTask: Task, requestUser: User): Promise<Task> {
    const inputTeam = inputTask?.team;

    // If not a team task, then assign it to creator itself
    if (!inputTeam) {
      inputTask.assigned_to = [requestUser];
    }
    // If trying to create a team task.
    else {
      const team = await this.dataService.team.getById(inputTask.team.id);
      // Checks the team actually exists or not.
      this.helper.validateCreateInput(team);
      // Checks if user is a memeber or not
      this.helper.checkTeamTaskAuthorization(team, requestUser);
    }

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

    // Validate if task exists or not.
    this.helper.validateInput(task);

    // If a team task, checks for required authorization.
    if (task.team) {
      const team = await this.dataService.team.getById(task.team.id);
      this.helper.checkTeamTaskAuthorization(team, requestUser);
    }
    // If individual task, checks if user is the cretor of task.
    else {
      this.helper.isOwner(task, requestUser);
    }

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
    // Validates if task exists or not.
    this.helper.validateInput(task);

    // Can only perform assignment operation on team task.
    this.helper.validateAssignmentOperation(task);

    const team = await this.dataService.team.getById(task.team.id);
    // Checks if the user is either an admin or task creator.
    this.helper.checkTeamTaskSpecialAuthorization(task, team, requestUser);
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
    // Validates if task exists or not.
    this.helper.validateInput(task);

    // Can only perform assignment operation on team task.
    this.helper.validateAssignmentOperation(task);

    const team = await this.dataService.team.getById(task.team.id);
    this.helper.checkTeamTaskSpecialAuthorization(task, team, requestUser);
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
    // Validates if task exists or not.
    this.helper.validateInput(task);

    // If team task,
    if (task.team) {
      const team = await this.dataService.team.getById(task.team.id);
      //Checks if the user is either an admin or task creator
      this.helper.checkTeamTaskSpecialAuthorization(task, team, requestUser);
    }
    // If individual task, checks if user is the creator of task.
    else {
      this.helper.isOwner(task, requestUser);
    }

    await this.dataService.task.delete(id);
  }
}
