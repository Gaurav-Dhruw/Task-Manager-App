import { Injectable, NotFoundException } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Team, User } from 'src/domain/entities';
import { TeamUseCasesHelper } from './team-use-cases.helper';

@Injectable()
export class TeamUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: TeamUseCasesHelper,
  ) {}

  // getAllTeams(): Promise<Team[]> {
  //   return this.dataService.team.getAll();
  // }

  async getTeam(id:string): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    if(!team) throw new NotFoundException('Team Not Found');

    return team;
  }

  getTeamsWhereUser(user_id: string): Promise<Team[]> {
    return this.dataService.team.getAllWhereUser(user_id);
  }
  async createTeam(teamInput: Team, requestUser: User): Promise<Team> {
    teamInput.admins = [requestUser];
    teamInput.members = [requestUser];

    return this.dataService.team.create(teamInput);
  }

  async addMembers(
    id: string,
    newMembers: User[],
    requestUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);

    this.helper.validateOperation(team, requestUser);
    this.helper.checkAdminAccess(team, requestUser);

    team.members = this.helper.mergeUsersList(team.members, newMembers);

    return this.dataService.team.update(team.id, team);
  }

  async removeMembers(
    id: string,
    removalList: User[],
    requestUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);

    this.helper.validateOperation(team, requestUser);
    this.helper.checkAdminAccess(team, requestUser);

    team.members = this.helper.filterUsers(team.members, removalList);
    team.admins = this.helper.filterUsers(team.admins, removalList);

    return this.dataService.team.update(team.id, team);
  }

  async addAdmins(
    id: string,
    newAdmins: User[],
    requestUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    this.helper.validateOperation(team, requestUser);
    this.helper.checkAdminAccess(team, requestUser);
    this.helper.areTeamMembers(team, newAdmins);

    team.admins = this.helper.mergeUsersList(team.admins, newAdmins);

    return this.dataService.team.update(team.id, team);
  }

  async removeAdmins(
    id: string,
    removalList: User[],
    requestUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    this.helper.validateOperation(team, requestUser);
    this.helper.checkAdminAccess(team, requestUser);

    team.admins = this.helper.filterUsers(team.admins, removalList);

    return this.dataService.team.update(team.id, team);
  }

  async deleteTeam(id: string, requestUser: User): Promise<void> {
    const team = await this.dataService.team.getById(id);

    this.helper.validateOperation(team, requestUser);
    this.helper.checkAdminAccess(team, requestUser);

    await this.dataService.team.delete(team.id);
  }
}
