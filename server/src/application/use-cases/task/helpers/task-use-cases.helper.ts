import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Task, Team, User } from 'src/domain/entities';

@Injectable()
export class TaskUseCasesHelper {
  //General Helpers
  validateInput(task: Task): void {
    if (!task) throw new NotFoundException('Task Not Found');
  }

  isOwner(task: Task, user: User) {
    if (task.created_by.id !== user.id) {
      throw new UnauthorizedException('User Unauthorized');
    }
  }

  checkTeamTaskAuthorization(team: Team, user: User): void {
    const isMember = !!team.members.find((member) => member.id === user.id);
    if (!isMember) throw new UnauthorizedException('User Unauthorized');
  }

  checkTeamTaskSpecialAuthorization(task: Task, team: Team, user: User) {
    const isAdmin = !!team.admins.find((admin) => admin.id === user.id);
    const isCreator = task.created_by.id === user.id;

    if (!(isAdmin || isCreator))
      throw new ForbiddenException('User Do Not Have Required Access');
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

  // Create Use-Case Helpers
  validateCreateInput(team: Team): void {
    if (!team) throw new NotFoundException('Team Not Found');
  }

  // Basic Update Use-Case Helpers

  // Assignment Use-Case Helpers
  validateAssignmentOperation(task: Task) {
    if (!task.team) throw new BadRequestException('Not A Team Task');
  }

  checkIfTeamMembers(team: Team, usersList: User[]): void {
    const members = team.members;
    const areTeamMembers = usersList.every(
      (user) => !!members.find((member) => member.id === user?.id),
    );

    if (!areTeamMembers)
      throw new BadRequestException('Invalid/Unauthorized Users Provided');
  }

  // Delete Use-Case Helpers
}
