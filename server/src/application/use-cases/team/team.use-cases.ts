import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Team, User } from 'src/domain/entities';
import { TeamUseCasesHelper } from './helpers/team-use-cases.helper';

@Injectable()
export class TeamUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: TeamUseCasesHelper,
  ) {}

  // getAllTeams(): Promise<Team[]> {
  //   return this.dataService.team.getAll();
  // }

  async getTeam(id: string, requestUser: User): Promise<Team> {
    const team = await this.dataService.team.getById(id);

    this.helper.validateInput(team);
    this.helper.checkAuthorization(team,requestUser);

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

  async updateTeam(teamInput: Team, requestUser: User): Promise<Team> {
    const team = await this.dataService.team.getById(teamInput.id);

    this.helper.validateInput(team);
    this.helper.checkAuthorization(team, requestUser);

    return this.dataService.team.update(teamInput.id, teamInput);
  }

  async addMembers(
    id: string,
    inputUsers: User[],
    requestUser: User,
  ): Promise<Team> {
    const users_ids = inputUsers.map((user) => user?.id);
    const [usersList, team] = await Promise.all([
      await this.dataService.user.getByIds(users_ids),
      await this.dataService.team.getById(id),
    ]);

    this.helper.validateInput(team);
    this.helper.checkAuthorization(team, requestUser);
    this.helper.checkAdminAccess(team,requestUser);

    this.helper.checkIfValidUsers(usersList, inputUsers);
    team.members = this.helper.mergeUsersList(team.members, inputUsers);

    return this.dataService.team.update(team.id, team);
  }

  async removeMembers(
    id: string,
    removalList: User[],
    requestUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);

    this.helper.validateInput(team);
    this.helper.checkAuthorization(team, requestUser);
    this.helper.checkAdminAccess(team, requestUser);
    
    this.helper.checkIfTeamMembers(team, removalList);
    this.helper.checkIfTeamAdmins(team, removalList);

    const newAdminsList = this.helper.filterUsersList(team.admins, removalList);
    const newMembersList = this.helper.filterUsersList(
      team.members,
      removalList,
    );

    team.admins = newAdminsList;
    team.members = newMembersList;

    return this.dataService.team.update(team.id, team);
  }

  async makeAdmin(
    id: string,
    inputUsers: User[],
    requestUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);

    this.helper.validateInput(team);
    this.helper.checkAuthorization(team, requestUser);
    this.helper.checkAdminAccess(team, requestUser);
    
    this.helper.checkIfTeamMembers(team, inputUsers);
    team.admins = this.helper.mergeUsersList(team.admins, inputUsers);

    return this.dataService.team.update(team.id, team);
  }

 

  async deleteTeam(id: string,user:User): Promise<void> {
    const team = await this.dataService.team.getById(id);

    this.helper.validateInput(team);
    this.helper.validateDeleteOperation(team);
    this.helper.checkAdminAccess(team, user);

    await this.dataService.team.delete(team.id);
  }
}
