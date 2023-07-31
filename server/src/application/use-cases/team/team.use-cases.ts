import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Team, User } from 'src/domain/entities';
import { TeamUseCasesHelper } from './team-use-cases.helper';
import { CommonUseCasesHelper } from 'src/application/helpers/use-cases.helper';

@Injectable()
export class TeamUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly commonHelper: CommonUseCasesHelper,
    private readonly helper: TeamUseCasesHelper,
  ) {}

  // getAllTeams(): Promise<Team[]> {
  //   return this.dataService.team.getAll();
  // }

  async getTeam(id: string, requestUser: User): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    console.log(team.members, requestUser);
    if (!team) throw new NotFoundException('Team Not Found');
    else if (!team.members.find((user) => requestUser.id === user.id))
      throw new UnauthorizedException('User Unauthorized');

    return team;
  }

  getTeamsWhereUser(user_id: string): Promise<Team[]> {
    return this.dataService.team.getAllWhereUser(user_id);
  }

  async createTeam(teamInput: Team, requestUser: User): Promise<Team> {
    const user = await this.dataService.user.getById(requestUser?.id);
    if (!user) throw new NotFoundException('User Not Found');

    teamInput.admins = [requestUser];
    teamInput.members = [requestUser];

    return this.dataService.team.create(teamInput);
  }

  async updateTeam(teamInput: Team, requestUser: User): Promise<Team> {
    const team = await this.dataService.team.getById(teamInput.id);

    this.helper.validateOperation({ team, requestUser });
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

    this.helper.validateOperation({ team, requestUser, usersList, inputUsers });
    this.helper.checkAuthorization(team, requestUser);
    this.commonHelper.checkAdminAccess(team, requestUser);

    team.members = this.commonHelper.mergeUsersList(team.members, inputUsers);

    return this.dataService.team.update(team.id, team);
  }

  async removeMembers(
    id: string,
    removalList: User[],
    requestUser: User,
  ): Promise<Team> {
    const team = await this.dataService.team.getById(id);

    this.helper.validateOperation({ team, requestUser });
    this.helper.checkAuthorization(team, requestUser);
    this.commonHelper.checkAdminAccess(team, requestUser);
    this.commonHelper.areTeamMembers(team, removalList);
    this.helper.areTeamAdmins(team, removalList);

    const newAdminsList = this.commonHelper.filterUsersList(
      team.admins,
      removalList,
    );
    const newMembersList = this.commonHelper.filterUsersList(
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

    this.helper.validateOperation({ team, requestUser });
    this.helper.checkAuthorization(team, requestUser);
    this.commonHelper.checkAdminAccess(team, requestUser);
    this.commonHelper.areTeamMembers(team, inputUsers);

    team.admins = this.commonHelper.mergeUsersList(team.admins, inputUsers);

    return this.dataService.team.update(team.id, team);
  }

  // async removeAdmins(
  //   id: string,
  //   removalList: User[],
  //   requestUser: User,
  // ): Promise<Team> {
  //   const team = await this.dataService.team.getById(id);
  //   this.helper.validateOperation(team, requestUser);
  //   this.helper.checkAdminAccess(team, requestUser);
  //   this.helper.areTeamMembers(team, removalList);

  //   const newAdminsList = this.helper.filterUsers(team.admins, removalList);
  //   if (newAdminsList.length === 0)
  //     throw new BadRequestException(
  //       'Atleast 1 Admin Should Remain In The Team',
  //     );

  //   team.admins = newAdminsList;

  //   return this.dataService.team.update(team.id, team);
  // }

  async deleteTeam(id: string): Promise<void> {
    const team = await this.dataService.team.getById(id);

    this.helper.validateDeleteOperation(team);

    await this.dataService.team.delete(team.id);
  }
}
