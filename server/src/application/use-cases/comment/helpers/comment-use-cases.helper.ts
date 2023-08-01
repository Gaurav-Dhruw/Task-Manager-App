import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Comment, Task, Team, User } from 'src/domain/entities';
import { AuthorizationHelper } from './authorization.helper';
import { ValidateInputHelper } from './validate-input.helper';
import { ValidateOperationHelper } from './validate-operation-helper';

@Injectable()
export class CommentUseCasesHelper {
  constructor(
    private readonly authorizationHelper: AuthorizationHelper,
    private readonly validateInputHelper: ValidateInputHelper,
    private readonly validateOperationHelper: ValidateOperationHelper,
  ) {}

  validateCreateInput(team: Team, task: Task): void {
    this.validateInputHelper.validateTask(task);
    this.validateInputHelper.validateTeam(team);
  }
  validateCreateOperation(team: Team, task: Task) {
    const isTeamTask = this.validateOperationHelper.isTeamTask(task);
    const taskBelongsToTheTeam =
      this.validateOperationHelper.taskBelongsToTheTeam(task, team);

    if (!isTeamTask || !taskBelongsToTheTeam) throw new BadRequestException();
  }

  validateReadInput(team: Team, task: Task) {
    this.validateInputHelper.validateTask(task);
    this.validateInputHelper.validateTeam(team);
  }

  validateReadOperation(team: Team, task: Task) {
    const isTeamTask = this.validateOperationHelper.isTeamTask(task);
    const taskBelongsToTheTeam =
      this.validateOperationHelper.taskBelongsToTheTeam(task, team);

    if (!isTeamTask || !taskBelongsToTheTeam) throw new BadRequestException();
  }
  checkReadAuthorization(team: Team, user: User) {
    const isMember = this.authorizationHelper.isMember(team, user);
    if (!isMember) throw new UnauthorizedException('User Unauthorized');
  }

  validateMutateInput(comment: Comment): void {
    this.validateInputHelper.validateComment(comment);
  }

  checkCreateAuthorization(team: Team, user: User) {
    const isMember = this.authorizationHelper.isMember(team, user);
    if (!isMember) throw new UnauthorizedException('User Unauthorized');
  }

  checkMutateAuthorization(comment: Comment, user: User) {
    const isOwner = this.authorizationHelper.isCommentOwner(comment, user);
    if (!isOwner) throw new UnauthorizedException('User Unauthorized');
  }
}
