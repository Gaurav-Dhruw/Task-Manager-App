import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment, Task, User } from 'src/domain/entities';
import { AuthorizationHelper } from './authorization.helper';
import { ValidateOperationHelper } from './validate-input.helper';

@Injectable()
export class CommentUseCasesHelper {
  constructor(
    private readonly authorizationHelper: AuthorizationHelper,
    private readonly validateOperationHelper: ValidateOperationHelper,
  ) {}

  validateCreateInput(task: Task): void {
    this.validateOperationHelper.validateTask(task);
  }
  validateCreateOperation(task: Task) {
    if (!task.team)
      throw new BadRequestException('Comments Not Allowed On Personal Task');
  }

  validateMutateInput(comment: Comment): void {
    this.validateOperationHelper.validateComment(comment);
  }

  checkCreateAuthorization(task: Task, user: User) {
    const isCreator = this.authorizationHelper.isTaskCreator(task, user);
    const isAssigned = this.authorizationHelper.isAssignedTo(task, user);

    if (!isCreator && !isAssigned)
      throw new UnauthorizedException('User Unauthorized');
  }

  checkMutateAuthorization(comment: Comment, user: User) {
    const isOwner = this.authorizationHelper.isCommentOwner(comment, user);
    if (!isOwner) throw new UnauthorizedException('User Unauthorized');
  }
}
