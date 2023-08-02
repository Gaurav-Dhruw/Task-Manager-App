import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Team, User } from 'src/domain/entities';

@Injectable()
export class TeamUseCasesHelper {
  // General Helpers

  checkAuthorization(team: Team, user: User): void {
    const isTeamMember: boolean = !!team.members.find(
      (member) => member.id === user.id,
    );
    if (!isTeamMember) throw new UnauthorizedException('User Unauthorized');
  }

  validateInput(team: Team): void {
    if (!team) throw new NotFoundException('Team Not Found');
  }

  checkAdminAccess(team: Team, user: User): void {
    const admins = team.admins;
    const isAdmin = !!admins.find((admin) => admin.id === user?.id);

    if (!isAdmin) throw new ForbiddenException('Admin access required');
  }

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

  // Team Members Update Helper

  checkIfTeamMembers(team: Team, usersList: User[]): void {
    const members = team.members;
    const areTeamMembers = usersList.every(
      (user) => !!members.find((member) => member.id === user?.id),
    );

    if (!areTeamMembers)
      throw new BadRequestException('Invalid/Unauthorized Users Provided');
  }

  checkIfTeamAdmins(team: Team, usersList: User[]): void {
    const admins = team.admins;
    const areTeamAdmins = usersList.some(
      (user) => !!admins.find((admin) => admin.id === user?.id),
    );

    if (areTeamAdmins)
      throw new ForbiddenException('Not Allowed To Remove Admins');
  }

  checkIfValidUsers(users: User[], inputUsers: User[]) {
    if (users.length !== inputUsers.length)
      throw new BadRequestException('Invalid/Unauthorized Users');
  }

  // Delete Use-Case Helpers

  validateDeleteOperation(team: Team) {
    if (team.members.length > 1) throw new ForbiddenException('Not Allowed');
  }
}
