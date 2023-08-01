import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Task, Team, User } from 'src/domain/entities';

@Injectable()
export class PersonalTaskHelper {
  //General Helpers
  validateInput(task: Task): void {
    if (!task) throw new NotFoundException('Task Not Found');
  }

  checkAuthorization(task: Task, user: User) {
    if (task.created_by.id !== user.id) {
      throw new UnauthorizedException('User Unauthorized');
    }
  }
}
