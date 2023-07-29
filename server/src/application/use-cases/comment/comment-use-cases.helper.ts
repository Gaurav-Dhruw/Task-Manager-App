import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Comment, Task, User } from 'src/domain/entities';

@Injectable()
export class CommentUseCasesHelper {
  constructor() {}

  checkAuthorization(comment: Comment, requestedUser: User): void {
    const originalUser = comment.user;
    if (!requestedUser || requestedUser.id !== originalUser.id)
      throw new UnauthorizedException('User Unauthorized');
  }

  validateOperation(validationOptions?:{comment?: Comment, user?:User, task?: Task}): void {
    const {comment, user, task}  = validationOptions;
    
    if(!comment || !user || !task) {
      const errors:string[] = [];
      if(!user) errors.push("User Not Found");
      if(!comment) errors.push('Comment Not Found');
      if(!task) errors.push("Task Not Found");

      throw new NotFoundException(errors);
    }
    
      else if(!task.team)
      throw new ForbiddenException("Comments are only allowed on team tasks");
  }


}
