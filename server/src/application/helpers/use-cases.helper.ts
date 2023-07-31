

import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { User, Team } from 'src/domain/entities';

@Injectable()
export class CommonUseCasesHelper {
  filterUsersList(filterFrom: User[], matchList: User[]) {
    const updatedList = filterFrom.filter(
      (curr) => !matchList.find((user) => user.id === curr.id),
    );
    return updatedList;
  }

  mergeUsersList(originalList: User[], newList: User[]) {
    const mergedList = originalList.concat(newList);
    const resultantList = mergedList.filter(
      (curr, idx, self) =>
        idx === self.findIndex((user) => user.id === curr.id),
    );
    return resultantList;
  }

  areTeamMembers(team: Team, usersList: User[]): void {
    const members = team.members;

    const areTeamMembers = usersList.every(
      (user) => !!members.find((member) => member.id === user?.id),
    );

    if (!areTeamMembers)
      throw new BadRequestException('Invalid/Unauthorized Users Provided');
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

}