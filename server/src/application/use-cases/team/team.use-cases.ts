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
import { RequestQuery } from 'src/domain/types/request-query.type';

@Injectable()
export class TeamUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: TeamUseCasesHelper,
  ) {}

  async getTeam(team_id: string, requestUser: User): Promise<Team> {
    const team = await this.dataService.team.getById(team_id);

    // Checks if team exists or not.
    this.helper.validateInput(team);
    // Checks if user is a team member.
    this.helper.checkAuthorization(team, requestUser);

    return team;
  }

  getAllTeams(user_id: string, query?: RequestQuery): Promise<Team[]> {
    const { pagination, where={}, search } = query || {};
    return this.dataService.team.getAll({
      where: { ...where, user_id, team_name: search },
      pagination,
    });
  }

  async createTeam(teamInput: Team, requestUser: User): Promise<Team> {
    teamInput.admins = [requestUser];
    teamInput.members = [requestUser];

    return this.dataService.team.create(teamInput);
  }

  async updateTeam(inputTeam: Team, requestUser: User): Promise<Team> {
    const team = await this.dataService.team.getById(inputTeam.id);

    // Checks if team exists or not.
    this.helper.validateInput(team);
    // Checks if user is a team member.
    this.helper.checkAuthorization(team, requestUser);

    const updatedTeam = { ...team, ...inputTeam };

    return this.dataService.team.update(inputTeam.id, updatedTeam);
  }

  async addMembers(
    team_id: string,
    inputUsers: User[],
    requestUser: User,
  ): Promise<Team> {
    const users_ids = inputUsers.map((user) => user?.id);
    const [usersList, team] = await Promise.all([
      await this.dataService.user.getByIds(users_ids),
      await this.dataService.team.getById(team_id),
    ]);

    // Checks if team exists or not.
    this.helper.validateInput(team);
    // Checks if user is a team member.
    this.helper.checkAuthorization(team, requestUser);
    // Checks if user is a team admin.
    this.helper.checkAdminAccess(team, requestUser);

    // Validates users list
    this.helper.checkIfValidUsers(usersList, inputUsers);

    team.members = this.helper.mergeUsersList(team.members, usersList);

    return this.dataService.team.update(team.id, team);
  }

  async removeMembers(
    team_id: string,
    removalList: User[],
    requestUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(team_id);

    // Checks if team exists or not.
    this.helper.validateInput(team);
    // Checks if user is a team member.
    this.helper.checkAuthorization(team, requestUser);
    // Checks if user is a team admin.
    this.helper.checkAdminAccess(team, requestUser);

    // Validates if users are team members or not.
    this.helper.checkIfTeamMembers(team, removalList);
    // Validates if users are team admins or not. As admins can't be removed.
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
    team_id: string,
    inputUsers: User[],
    requestUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(team_id);

    // Checks if team exists or not.
    this.helper.validateInput(team);
    // Checks if user is a team member.
    this.helper.checkAuthorization(team, requestUser);
    // Checks if user is a team admin.
    this.helper.checkAdminAccess(team, requestUser);

    // Validates if users are team members or not.
    this.helper.checkIfTeamMembers(team, inputUsers);
    team.admins = this.helper.mergeUsersList(team.admins, inputUsers);

    return this.dataService.team.update(team.id, team);
  }

  async deleteTeam(team_id: string, requestUser: User): Promise<void> {
    const team = await this.dataService.team.getById(team_id);

    // Checks if team exits or not.
    this.helper.validateInput(team);
    // Checks if user is a team member;
    this.helper.checkAuthorization(team, requestUser);
    // Checks if user is a team admin.
    this.helper.checkAdminAccess(team, requestUser);

    // If team has more than 1 members, team can't be deleted.
    this.helper.validateDeleteOperation(team);

    await this.dataService.team.delete(team_id);
  }
}
