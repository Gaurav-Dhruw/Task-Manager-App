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
  validateOperation(task: Task): void {
    if (!task) throw new NotFoundException('Task Not Found');
  }

  validateAssignmentOperation(task: Task) {
    this.validateOperation(task);
    if (!task?.team) throw new BadRequestException('Not A Team Task');
  }

  checkMutateAuthorization(team: Team, user: User, task?: Task) {
    if (team) {
      const isAdmin = !!team.admins.find((admin) => admin.id === user.id);
      const isMember = !!team.members.find((member) => member.id === user.id);

      if (!isMember) throw new UnauthorizedException('User Unauthorized');
      else if (!(isAdmin || task.created_by.id === user.id))
        throw new ForbiddenException('User Do Not Have Required Access');
    } else if (task && task.created_by.id !== user.id) {
      throw new UnauthorizedException('User Unauthorized');
    }
  }

  validateCreateOperation(inputTeam: Team, team: Team): void {
    if (inputTeam && !team) throw new BadRequestException('Team Not Found');
  }

  checkCreateAuthorization(team: Team, user: User): void {
    if (team) {
      const isMember = !!team.members.find((member) => member.id === user.id);
      if (!isMember) throw new UnauthorizedException('User Unauthorized');
    }
  }

  

  
}
