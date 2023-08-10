import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Comment, Task, Team, User } from 'src/domain/entities';

@Injectable()
export class AuthorizationHelper {
  isTeamMember(team: Team, user: User): boolean {
    return !!team.members.find((member) => member.id === user.id);
  }

  isCommentOwner(comment: Comment, user: User) {
    return comment.user.id === user.id;
  }
}
