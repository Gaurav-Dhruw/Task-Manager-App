import {
  Body,
  Controller,
  Post,
  Req,
  Patch,
  Delete,
  Param,
  ParseUUIDPipe,
  Get,
  Query,
} from '@nestjs/common';
import { CommentUseCases } from 'src/application/use-cases/comment/comment.use-cases';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { CustomRequest } from 'src/presentation/common/types';
import { Comment, Task, User } from 'src/domain/entities';
import { RequestQueryPipe } from 'src/presentation/common/pipes';
import { PaginationDto } from 'src/presentation/common/dtos';

@Controller('team/:team_id/task/:task_id/comment')
export class CommentController {
  constructor(private readonly commentUseCases: CommentUseCases) {}

  @Post()
  createComment(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Param('task_id', ParseUUIDPipe) task_id: string,
    @Body() commentDto: CreateCommentDto,
  ) {
    const comment = new Comment(commentDto);
    comment.task = new Task({ id: task_id });
    comment.user = new User(req.user);
    return this.commentUseCases.createComment(comment, team_id);
  }

  @Get('list')
  findAllComments(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Param('task_id', ParseUUIDPipe) task_id: string,
    @Query(RequestQueryPipe) query: PaginationDto,
  ) {
    const requestUser = new User(req.user);
    return this.commentUseCases.getAllComments(team_id, task_id, requestUser, query as any);
  }

  @Patch(':comment_id')
  updateComment(
    @Req() req: CustomRequest,
    @Param('comment_id', ParseUUIDPipe) comment_id: string,

    @Body() commentDto: UpdateCommentDto,
  ) {
    const comment = new Comment({ ...commentDto, id: comment_id });
    const requestUser = new User(req.user);

    return this.commentUseCases.updateComment(comment, requestUser);
  }

  @Delete(':comment_id')
  async deleteComment(
    @Req() req: CustomRequest,
    @Param('comment_id', ParseUUIDPipe) comment_id: string,
  ) {
    const requestUser = new User(req.user);

    await this.commentUseCases.deleteComment(comment_id, requestUser);
  }
}
