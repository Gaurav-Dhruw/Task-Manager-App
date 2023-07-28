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

  getAllTeams(): Promise<Team[]> {
    return this.dataService.team.getAll();
  }
  createTeam(teamInput: Team, teamCreator: User): Promise<Team> {
    teamInput.admins = [teamCreator];
    teamInput.members = [teamCreator];
    return this.dataService.team.create(teamInput);
  }

  async addMembers(
    id: string,
    newMembers: User[],
    requestedUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    if (!team) throw new NotFoundException('Team Not Found');
    this.helper.checkAuthorization(team, requestedUser);
    this.helper.checkAdminAccess(team, requestedUser);

    team.members = this.helper.mergeUsersList(team.members, newMembers);

    return this.dataService.team.update(team.id, team);
  }

  async removeMembers(
    id: string,
    membersToBeRemoved: User[],
    requestedUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    if (!team) throw new NotFoundException('Team Not Found');
    this.helper.checkAuthorization(team, requestedUser);
    this.helper.checkAdminAccess(team, requestedUser);

    team.members = this.helper.filterUsers(team, membersToBeRemoved, 'members');
    team.admins = this.helper.filterUsers(team, membersToBeRemoved, 'admins');

    return this.dataService.team.update(team.id, team);
  }

  async addAdmins(
    id: string,
    newAdmins: User[],
    requestedUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    if (!team) throw new NotFoundException('Team Not Found');
    this.helper.checkAuthorization(team, requestedUser);
    this.helper.checkAdminAccess(team, requestedUser);
    this.helper.areTeamMembers(team, newAdmins);

    team.admins = this.helper.mergeUsersList(team.admins, newAdmins);

    return this.dataService.team.update(team.id, team);
  }

  async removeAdmins(
    id: string,
    adminsToBeRemoved: User[],
    requestedUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    if (!team) throw new NotFoundException('Team Not Found');
    this.helper.checkAuthorization(team, requestedUser);
    this.helper.checkAdminAccess(team, requestedUser);

    team.admins = this.helper.filterUsers(team, adminsToBeRemoved, 'admins');

    return this.dataService.team.update(team.id, team);
  }

  async deleteTeam(id: string, requestedUser: User): Promise<void> {
    const team = await this.dataService.team.getById(id);
    if (!team) throw new NotFoundException('Team Not Found');
    this.helper.checkAuthorization(team, requestedUser);
    this.helper.checkAdminAccess(team, requestedUser);

    await this.dataService.team.delete(team.id);
  }
}
