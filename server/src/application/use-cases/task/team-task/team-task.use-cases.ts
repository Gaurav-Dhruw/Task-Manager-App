import { Injectable } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Task, Team, User } from 'src/domain/entities';
import { TeamTaskHelper } from './helpers/team-task.helper';
import { IRequestQuery } from 'src/domain/types/request-query.type';

@Injectable()
export class TeamTaskUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: TeamTaskHelper,
  ) {}

  // Done
  async createTask(
    inputTask: Task,
    team_id: string,
    requestUser: User,
  ): Promise<Task> {
    const team = await this.dataService.team.getById(team_id);
    // Checks the team actually exists or not.
    this.helper.validateCreateInput(team);
    
    // Checks if user is a memeber or not
    this.helper.checkTeamLevelAuthorization(team, requestUser);

    inputTask.created_by = requestUser;
    inputTask.team = new Team({ id: team_id });

    return this.dataService.task.create(inputTask);
  }

  // Done
  async getAllTasks(
    team_id: string,
    requestUser: User,
    query?: IRequestQuery,
  ): Promise<Task[]> {
    const team = await this.dataService.team.getById(team_id);

    // Checks the team actually exists or not.
    this.helper.validateGetAllInput(team);
    
    // Checks if user is a memeber or not
    this.helper.checkTeamLevelAuthorization(team, requestUser);

    const { where = {}, pagination, sort, search = '' } = query || {};
    const { page = 1, limit = 10 } = pagination || {};

    return this.dataService.task.getAll({
      where: { ...where, team_id, title: search, description: search },
      sort,
      pagination: { page, limit },
    });
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

    // Checks if team and task exits. Also checks if provided task is
    // indeed a team task and belongs to provided team;
    this.helper.validateGetInput(team, task);

    // Checks if user is a memeber or not
    this.helper.checkTeamLevelAuthorization(team, requestUser);

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

    // Checks if team and task exits. Also checks if provided task is 
    // indeed a team task and belongs to provided team;
    this.helper.validateMutateInput(team, task);


    // Checks if user is one of the team members.
    this.helper.checkTeamLevelAuthorization(team, requestUser);
    // Checks if user is any of the assigned to task, task creator, or admin.
    this.helper.checkTaskLevelAuthorization(team, task, requestUser);

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
    // Checks if team and task exits. Also checks if provided task is
    // indeed a team task and belongs to provided team;
    this.helper.validateMutateInput(team, task);

    // Checks if user is one of the team members.
    this.helper.checkTeamLevelAuthorization(team, requestUser);
    // Checks if user is any of task creator, or admin.
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
    // Checks if team and task exits. Also checks if provided task is
    // indeed a team task and belongs to provided team;
    this.helper.validateMutateInput(team, task);


    // Checks if user is one of the team members.
    this.helper.checkTeamLevelAuthorization(team, requestUser);
    // Checks if user is any of task creator, or admin.
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
    // Checks if team and task exits. Also checks if provided task is
    // indeed a team task and belongs to provided team;
    this.helper.validateMutateInput(team, task);

    // Checks if user is any of the task creator or admin.
    this.helper.checkTaskLevelAuthorization(team, task, requestUser);

    await this.dataService.task.delete(task_id);
  }
}
