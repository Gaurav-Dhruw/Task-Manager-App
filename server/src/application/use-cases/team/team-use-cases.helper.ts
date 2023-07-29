import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { IDataService } from 'src/domain/abstracts';
import { Team, User } from 'src/domain/entities';

@Injectable()
export class TeamUseCasesHelper {
  filterUsers(currList: User[], filterList: User[]): User[] {
    const filteredList = currList.filter(
      (curr) => !filterList.find((user) => user?.id === curr.id),
    );
    return filteredList;
  }

  mergeUsersList(oldList: User[], newList: User[]): User[] {
    const concatinatedList = oldList.concat(newList);
    const updatedList = concatinatedList.filter((user, idx, self) => {
      if (!user.id) return false;
      return idx === self.findIndex((curr) => curr.id === user.id);
    });
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

  // checkAuthorization(team: Team, requestedUser: User): void {
  //   const members = team.members;
  //   const isAuthorized = members.find(
  //     (member) => member.id === requestedUser?.id,
  //   );

  //   if (!isAuthorized) throw new UnauthorizedException('User Unauthorized');
  // }

  validateOperation(team: Team, user: User): void {
    const errMsgs: string[] = [];
    if (!user) errMsgs.push('User Not Found');
    if (!team) errMsgs.push('Team Not Found');

    if (errMsgs.length > 0) throw new NotFoundException(errMsgs);
  }

  // validateRequestUser(user: User): void {
  //   if (!user) throw new NotFoundException('User Not Found');
  // }
}
