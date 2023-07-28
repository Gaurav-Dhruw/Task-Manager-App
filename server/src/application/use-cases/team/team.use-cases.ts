import { Injectable, NotFoundException } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Team, User } from 'src/domain/entities';

@Injectable()
export class TeamUseCases {
  constructor(private readonly dataService: IDataService) {}

  getAllTeams(): Promise<Team[]> {
    return this.dataService.team.getAll();
  }
  createTeam(teamInput: Team, teamCreator: User): Promise<Team> {
    teamInput.admins = [teamCreator];
    teamInput.members = [teamCreator];
    return this.dataService.team.create(teamInput);
  }

  async addMembers(id: string, newMembers: User[]): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    if (!team) throw new NotFoundException('Team Not Found');

    team.members = this.mergeUsersList(team.members, newMembers);
    return this.dataService.team.update(team.id, team);
  }

  async removeMembers(id: string, membersToBeRemoved: User[]): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    if (!team) throw new NotFoundException('Team Not Found');

    team.members = this.filterUsers(team, membersToBeRemoved, 'members');
    team.admins = this.filterUsers(team, membersToBeRemoved, 'admins');

    return this.dataService.team.update(team.id, team);
  }

  async addAdmins(id: string, newAdmins: User[]): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    if (!team) throw new NotFoundException('Team Not Found');

    team.admins = this.mergeUsersList(team.admins, newAdmins);
    return this.dataService.team.update(team.id, team);
  }

  async removeAdmins(id: string, adminsToBeRemoved: User[]): Promise<Team> {
    const team = await this.dataService.team.getById(id);
    if (!team) throw new NotFoundException('Team Not Found');

    team.admins = this.filterUsers(team, adminsToBeRemoved, 'admins');

    return this.dataService.team.update(team.id, team);
  }

  async deleteTeam(id: string): Promise<void> {
    const team = await this.dataService.team.getById(id);
    if (!team) throw new NotFoundException('Team Not Found');

    await this.dataService.team.delete(id);
  }

  filterUsers(
    team: Team,
    users: User[],
    memberType: 'admins' | 'members',
  ): User[] {
    return team[memberType].filter((curr) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === curr.id) return false;
      }
      return true;
    });
  }

  mergeUsersList(oldList: User[], newList: User[]): User[] {
    const concatinatedList = oldList.concat(newList);
    const updatedList = concatinatedList.filter((user, idx, self) => {
      if (!user.id) return false;
      return idx === self.findIndex((curr) => curr.id === user.id);
    });
    // console.log(oldList, newList, updatedList);
    return updatedList;
  }
}
