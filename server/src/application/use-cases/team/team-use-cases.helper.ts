import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Team, User } from 'src/domain/entities';

@Injectable()
export class TeamUseCasesHelper {
  constructor(private readonly dataservice: IDataService) {}

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

  checkAdminAccess(team: Team, requestedUser: User): void {
    conditionCheck: {
      if (!requestedUser && !requestedUser.id) break conditionCheck;

      const userFound = team.admins.find(
        (admin) => admin.id === requestedUser.id,
      );

      if (!userFound) break conditionCheck;
      return;
    }

    throw new ForbiddenException('Admin access required');
  }

  areTeamMembers(team: Team, newAdmins: User[]): void {
    const members = team.members;

    const areTeamMembers = newAdmins.every(
      (newAdmin) => !!members.find((member) => member.id === newAdmin?.id),
    );

    if (!areTeamMembers)
      throw new BadRequestException('Users must be team members');
  }

  checkAuthorization(team: Team, requestedUser: User): void {
    const members = team.members;
    const isAuthorized = members.find(
      (member) => member.id === requestedUser?.id,
    );

    if (!isAuthorized) throw new UnauthorizedException('User Unauthorized');
  }
}
