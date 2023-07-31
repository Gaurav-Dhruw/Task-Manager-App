import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Comment, User } from 'src/domain/entities';
import { CommentUseCasesHelper } from './helpers/comment-use-cases.helper';

@Injectable()
export class CommentUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: CommentUseCasesHelper,
  ) {}

  //Done
  async createComment(inputComment: Comment): Promise<Comment> {
    const requestUser = inputComment.user;
    const inputTask = inputComment.task;

    const task = await this.dataService.task.getById(inputTask.id);

    this.helper.validateCreateInput(task);
    this.helper.checkCreateAuthorization(task, requestUser);
    this.helper.validateCreateOperation(task);

    inputComment.created_at = new Date();
    return this.dataService.comment.create(inputComment);
  }

  //Done
  async updateComment(
    inputComment: Comment,
    requestUser: User,
  ): Promise<Comment> {
    const comment = await this.dataService.comment.getById(inputComment.id);

    this.helper.validateMutateInput(comment);
    this.helper.checkMutateAuthorization(comment, requestUser);

    const updatedComment = {...comment, ...inputComment};
    return this.dataService.comment.update(inputComment.id, updatedComment);
  }

  // Done
  async deleteComment(id: string, requestUser: User): Promise<void> {
    const comment = await this.dataService.comment.getById(id);

    this.helper.validateMutateInput(comment);
    this.helper.checkMutateAuthorization(comment, requestUser);

    await this.dataService.comment.delete(id);
  }
}
