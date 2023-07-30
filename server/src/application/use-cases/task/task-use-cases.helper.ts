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
  validateMutateOperation(task: Task, user: User): void {
    const errMsgs: string[] = [];

    if (!user) errMsgs.push('User Not Found');
    if (!task) errMsgs.push('Task Not Found');

    if (errMsgs.length > 0) throw new NotFoundException(errMsgs);

    if (!task?.team) throw new ForbiddenException('Not a team Task');
  }

  checkMutateAuthorization(team: Team, user: User, task?: Task) {
    if (team) {
      const isAdmin = !!team.admins.find((admin) => admin.id === user.id);
      const isMember = !!team.members.find((member) => member.id === user.id);

      if (!isMember) throw new UnauthorizedException('User Unauthorized');
      else if (!(isAdmin || task.created_by.id === user.id))
        throw new ForbiddenException('User Do Not Have Required Access');
    } else if (task.created_by.id !== user.id) {
      throw new UnauthorizedException('User Unauthorized');
    }
  }

  validateCreateOperation(teamInput: Team, team: Team, user: User): void {
    const errMsgs: string[] = [];

    if (!user) errMsgs.push('User Not Found');
    if (teamInput && !team) errMsgs.push('Team Not Found');

    if (errMsgs.length > 0) throw new NotFoundException(errMsgs);
  }

  checkCreateAuthorization(team: Team, user: User): void {
    if (team) {
      //   const isAdmin = !!team.admins.find((admin) => admin.id === user.id);
      const isMember = !!team.members.find((member) => member.id === user.id);

      if (!isMember) throw new UnauthorizedException('User Unauthorized');
      //   else if (!isAdmin)
      //     throw new ForbiddenException('User Do Not Have Required Access');
    }
  }

  filterUsersList(filterFrom: User[], matchList: User[]) {
    const updatedList = filterFrom.filter(
      (curr) => !!matchList.find((user) => user.id === curr.id),
    );
    return updatedList;
  }

  mergeUsersList(originalList: User[], newList: User[]) {
    const mergedList = originalList.concat(newList);
    const updatedList = mergedList.filter(
      (curr, idx, self) =>
        idx === self.findIndex((user) => user.id === curr.id),
    );
    return updatedList;
  }

  areTeamMembers(team: Team, usersList: User[]): void {
    const members = team.members;

    const areTeamMembers = usersList.every(
      (user) => !!members.find((member) => member.id === user?.id),
    );

    if (!areTeamMembers)
      throw new BadRequestException('Invalid/Unauthorized Users Provided');
  }
}
