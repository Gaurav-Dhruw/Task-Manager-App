import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Comment, Task } from 'src/domain/entities';

@Injectable()
export class ValidateOperationHelper {
  validateTask(task: Task) {
    if (!task) throw new NotFoundException('Task Not Found');
  }

  validateComment(comment: Comment) {
    if (!comment) throw new NotFoundException('Comment Not Found');
  }
}
