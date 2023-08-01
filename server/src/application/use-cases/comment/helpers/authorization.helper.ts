import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Comment, Task, Team, User } from 'src/domain/entities';

@Injectable()
export class AuthorizationHelper {
  isAssignedTo(task: Task, user: User): boolean {
    const isAssigned: boolean = !!task.assigned_to.find(
      (assignedUser) => assignedUser.id === user.id,
    );
    return isAssigned;
  }

  isMember(team: Team, user: User): boolean {
    return !!team.members.find((member) => member.id === user.id);
  }
  isTaskCreator(task: Task, user: User): boolean {
    return task.created_by.id === user.id;
  }

  isCommentOwner(comment: Comment, user: User) {
    return comment.user.id === user.id;
  }
}
