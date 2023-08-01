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
  async createTask(inputTask: Task, team_id:string, requestUser: User): Promise<Task> {
    const team = await this.dataService.team.getById(team_id);
    // Checks the team actually exists or not.
    this.helper.validateCreateInput(team);
    // Checks if user is a memeber or not
    this.helper.checkAuthorization(team, requestUser);

    inputTask.created_by = requestUser;
    return this.dataService.task.create(inputTask);
  }

  // Done
  async getAllTasks(team_id: string, requestUser:User): Promise<Task[]> {
    const team = await this.dataService.team.getById(team_id);

    // Checks the team actually exists or not.
    this.helper.validateGetAllInput(team);
    // Checks if user is a memeber or not
    this.helper.checkAuthorization(team, requestUser);

    return team.tasks;
  }

  // Done
  async getTask(
    task_id: string,
    team_id: string,
    requestUser: User,
  ): Promise<Task> {
    const [task, team] = await Promise.all([
      await this.dataService.task.getById(task_id),
      await this.dataService.team.getById(team_id),
    ]);

    // Checks the team and task actually exists or not.
    this.helper.validateGetInput(team, task);

    // Checks if provide task is indeed a team task and belongs to provided team;
    this.helper.validateGetOperation(team, task);

    // Checks if user is a memeber or not
    this.helper.checkAuthorization(team, requestUser);

    return task;
  }

  // Done
  async updateTask(
    inputTask: Task,
    team_id: string,
    requestUser: User,
  ): Promise<Task> {
    const [task, team] = await Promise.all([
      await this.dataService.task.getById(inputTask.id),
      await this.dataService.team.getById(team_id),
    ]);

    // Validate team and task.
    this.helper.validateMutateInput(team, task);
    // Checks if provide task is indeed a team task and belongs to provided team;
    this.helper.validateMutateOperation(team, task);
    
    // Checks for required authorization.
    this.helper.checkAuthorization(team, requestUser);

    const updatedTask = { ...task, ...inputTask };

    return this.dataService.task.update(task.id, updatedTask);
  }

  // Done
  async assignTask(
    task_id: string,
    assign: User[],
    team_id: string,
    requestUser: User,
  ): Promise<Task> {
    const [task, team] = await Promise.all([
      await this.dataService.task.getById(task_id),
      await this.dataService.team.getById(team_id),
    ]);
    // Validate team task.
    this.helper.validateMutateInput(team, task);
    // Checks if provide task is indeed a team task and belongs to provided team;
    this.helper.validateMutateOperation(team, task);

    //Checks if user is team member.
    this.helper.checkAuthorization(team, requestUser);
    // Checks if the user is either an admin or task creator.
    this.helper.checkSpecialAuthorization(team, task, requestUser);

    // Checks if the provided users are team members or not.
    this.helper.checkIfTeamMembers(team, assign);

    const newAssignedList = this.helper.mergeUsersList(
      task.assigned_to,
      assign,
    );

    task.assigned_to = newAssignedList;
    return this.dataService.task.update(task_id, task);
  }

  // Done
  async unassignTask(
    task_id: string,
    unassign: User[],
    team_id: string,
    requestUser: User,
  ): Promise<Task> {
    const [task, team] = await Promise.all([
      await this.dataService.task.getById(task_id),
      await this.dataService.team.getById(team_id),
    ]);
    // Validate team and task.
    this.helper.validateMutateInput(team, task);
    // Checks if provide task is indeed a team task and belongs to provided team;
    this.helper.validateMutateOperation(team, task);
    
    
    //Checks if user is team member.
    this.helper.checkAuthorization(team, requestUser);
    // Checks if the user is either an admin or task creator.
    this.helper.checkSpecialAuthorization(team, task, requestUser);

    // Checks if the provided users are team members or not.
    this.helper.checkIfTeamMembers(team, unassign);

    const newAssignedList = this.helper.filterUsersList(
      task.assigned_to,
      unassign,
    );

    task.assigned_to = newAssignedList;
    return this.dataService.task.update(task_id, task);
  }

  //Done
  async deleteTask(
    task_id: string,
    team_id: string,
    requestUser: User,
  ): Promise<void> {
    const [task, team] = await Promise.all([
      await this.dataService.task.getById(task_id),
      await this.dataService.team.getById(team_id),
    ]);
    // Validate team  and task.
    this.helper.validateMutateInput(team, task);

    // Checks if provide task is indeed a team task and belongs to provided team;
    this.helper.validateMutateOperation(team, task);

    //Checks if user is team member.
    this.helper.checkAuthorization(team, requestUser);
    //Checks if the user is either an admin or task creator
    this.helper.checkSpecialAuthorization(team, task, requestUser);

    await this.dataService.task.delete(task_id);
  }
}
