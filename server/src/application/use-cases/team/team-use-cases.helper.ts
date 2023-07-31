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
  areTeamAdmins(team: Team, usersList: User[]): void {
    const admins = team.admins;

    const areTeamAdmins = usersList.some(
      (user) => !!admins.find((admin) => admin.id === user?.id),
    );

    if (areTeamAdmins)
      throw new ForbiddenException('Not Allowed To Remove Admins');
  }

  checkAuthorization(team: Team, requestedUser: User): void {
    const members = team.members;
    const isAuthorized = members.find(
      (member) => member.id === requestedUser?.id,
    );

    if (!isAuthorized) throw new UnauthorizedException('User Unauthorized');
  }

  validateOperation(options?: {
    team?: Team;
    requestUser?: User;
    usersList?: User[];
    inputUsers?: User[];
  }): void {
    const { team, requestUser, usersList, inputUsers } = options;
    if (usersList && usersList.length !== inputUsers.length) {
      throw new NotFoundException('Users Not Found');
    } else {
      const errMsgs: string[] = [];
      if (!requestUser) errMsgs.push('User Not Found');
      if (!team) errMsgs.push('Team Not Found');

      if (errMsgs.length > 0) throw new NotFoundException(errMsgs);
    }
  }

  // validateRequestUser(user: User): void {
  //   if (!user) throw new NotFoundException('User Not Found');
  // }

  validateDeleteOperation(team: Team) {
    if (!team) throw new NotFoundException('Team Not Found');
    else if (team.members.length > 0)
      throw new ForbiddenException('Not Allowed');
  }
}
