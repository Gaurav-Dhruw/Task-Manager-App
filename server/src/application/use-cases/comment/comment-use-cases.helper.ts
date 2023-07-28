import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Comment, User } from 'src/domain/entities';

@Injectable()
export class CommentUseCasesHelper {
  constructor() {}

  checkAuthorization(comment: Comment, requestedUser: User): void {
    const originalUser = comment.user;

    if (requestedUser.id !== originalUser.id)
      throw new UnauthorizedException('User Unauthorized');
  }
}
