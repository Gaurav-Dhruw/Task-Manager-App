import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Comment, User } from 'src/domain/entities';
import { CommentUseCasesHelper } from './comment-use-cases.helper';

@Injectable()
export class CommentUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: CommentUseCasesHelper,
  ) {}

  async createComment(commentInput: Comment): Promise<Comment> {
    const requestedUser = commentInput.user;
    const attachedTask = commentInput.task;

    const resp = await Promise.all([
      await this.dataService.user.getById(requestedUser?.id),
      await this.dataService.task.getById(attachedTask?.id),
    ]);

    const user = resp[0];
    const task = resp[1];

    this.helper.validateOperation({task,user});

    return this.dataService.comment.create(commentInput);
  }

  async updateComment(
    commentInput: Comment,
    requestedUser: User,
  ): Promise<Comment> {
    const resp = await Promise.all([
      await this.dataService.user.getById(requestedUser?.id),
      await this.dataService.comment.getById(commentInput.id),
    ]);

    const user = resp[0];
    const comment = resp[1];

    this.helper.validateOperation(comment);
    this.helper.checkAuthorization(comment, user);

    return this.dataService.comment.update(commentInput.id, commentInput);
  }

  async deleteComment(id: string, requestUser: User): Promise<void> {
    const resp = await Promise.all([
      await this.dataService.user.getById(requestUser?.id),
      await this.dataService.comment.getById(id),
    ]);

    const user = resp[0];
    const comment = resp[1];

    this.helper.validateOperation(comment);
    this.helper.checkAuthorization(comment, user);

    await this.dataService.comment.delete(id);
  }
}
