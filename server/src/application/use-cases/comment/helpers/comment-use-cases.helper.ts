import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment, Task, Team, User } from 'src/domain/entities';
import { AuthorizationHelper } from './authorization.helper';

@Injectable()
export class CommentUseCasesHelper {
  constructor(
    private readonly authorizationHelper: AuthorizationHelper,
  ) {}
    // Create/Read Use-Case Helpers
  validateCRInput(team: Team, task: Task) {
    const errorMsgs: string[] = [];

    if (!task) errorMsgs.push('Task Not Found');
    if (!team) errorMsgs.push('Team Not Found');

    if (errorMsgs.length > 0) throw new NotFoundException(errorMsgs);
  }

  validateCROperation(team: Team, task: Task) {
    const taskBelongsToTheTeam = task.team?.id === team?.id;
    if (!taskBelongsToTheTeam) throw new BadRequestException();
  }
  checkCRAuthorization(team: Team, user: User) {
    const isMember = this.authorizationHelper.isTeamMember(team, user);
    if (!isMember) throw new UnauthorizedException('User Unauthorized');
  }

  // Mutate Use-Case Helpers
  validateMutateInput(comment: Comment): void {
    if (!comment)  throw new NotFoundException('Comment Not Found');
  }

  checkMutateAuthorization(comment: Comment, user: User) {
    const isOwner = this.authorizationHelper.isCommentOwner(comment, user);
    if (!isOwner) throw new UnauthorizedException('User Unauthorized');
  }
}
