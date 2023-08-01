import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Comment, Task, Team } from 'src/domain/entities';

@Injectable()
export class ValidateInputHelper {
  validateTask(task: Task) {
    if (!task) throw new NotFoundException('Task Not Found');
  }
  validateTeam(team: Team) {
    if (!team) throw new NotFoundException('Team Not Found');
  }
  validateComment(comment: Comment) {
    if (!comment) throw new NotFoundException('Comment Not Found');
  }
}
