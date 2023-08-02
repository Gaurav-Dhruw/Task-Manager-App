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
  async createComment(
    inputComment: Comment,
    team_id: string,
  ): Promise<Comment> {
    const inputTask = inputComment.task;
    const requestUser = inputComment.user;

    const [task, team] = await Promise.all([
      await this.dataService.task.getById(inputTask.id),
      await this.dataService.team.getById(team_id),
    ]);

    // checks for team and task existance.
    this.helper.validateCRInput(team, task);
    // checks whether task belongs to the provided team.
    this.helper.validateCROperation(team, task);
    // checks if user is a team memeber.
    this.helper.checkCRAuthorization(team, requestUser);
    inputComment.created_at = new Date();

    return this.dataService.comment.create(inputComment);
  }

  async getAllComments(team_id:string, task_id:string, requestUser:User){
    const [task, team] = await Promise.all([
      await this.dataService.task.getById(task_id),
      await this.dataService.team.getById(team_id),
    ]);
    // checks for team and task existance.
    this.helper.validateCRInput(team,task);
    // checks whether task belongs to the provided team.
    this.helper.validateCROperation(team, task);
    // checks if user is a team memeber.
    this.helper.checkCRAuthorization(team, requestUser);

    return this.dataService.comment.getAllWhereTask(task_id);
  }

  //Done
  async updateComment(
    inputComment: Comment,
    requestUser: User,
  ): Promise<Comment> {
    const comment = await this.dataService.comment.getById(inputComment.id);
  
    // Checks for comment existance.
    this.helper.validateMutateInput(comment);
    // Checks if the user is the commentor.
    this.helper.checkMutateAuthorization(comment, requestUser);

    const updatedComment = { ...comment, ...inputComment };
    return this.dataService.comment.update(inputComment.id, updatedComment);
  }

  // Done
  async deleteComment(comment_id: string, requestUser: User): Promise<void> {
    const comment = await this.dataService.comment.getById(comment_id);

    // Checks for comment existance.
    this.helper.validateMutateInput(comment);
    // Checks if the user is the commentor.
    this.helper.checkMutateAuthorization(comment, requestUser);

    await this.dataService.comment.delete(comment_id);
  }
}
