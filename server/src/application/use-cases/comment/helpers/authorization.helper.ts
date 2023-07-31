import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Comment, Task, User } from 'src/domain/entities';

@Injectable()
export class AuthorizationHelper {
  isAssignedTo(task: Task, user: User):boolean {
    const isAssigned: boolean = !!task.assigned_to.find(
      (assignedUser) => assignedUser.id === user.id,
    );
    return isAssigned
  }
  isTaskCreator(task: Task, user: User):boolean {
    return task.created_by.id === user.id;
  }

  isCommentOwner(comment:Comment, user:User){
    return comment.user.id === user.id;
  }
}
