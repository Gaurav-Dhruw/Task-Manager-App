import {
  Body,
  Controller,
  Post,
  Req,
  Patch,
  Delete,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommentUseCases } from 'src/application/use-cases/comment/comment.use-cases';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { CustomRequest } from 'src/presentation/common/types';
import { Comment, Task, User } from 'src/domain/entities';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentUseCases: CommentUseCases) {}

  @Post('create')
  createComment(
    @Req() req: CustomRequest,
    @Body() commentDto: CreateCommentDto,
  ) {
    const comment = new Comment(commentDto);
    comment.user = new User(req.user);

    return this.commentUseCases.createComment(comment);
  }

  @Patch('create')
  updateComment(
    @Req() req: CustomRequest,
    @Body() commentDto: UpdateCommentDto,
  ) {
    const comment = new Comment(commentDto);
    const requestUser = new User(req.user);

    return this.commentUseCases.updateComment( comment, requestUser);
  }

  @Delete(':id')
  async deleteComment(@Req() req: CustomRequest, @Param('id', ParseUUIDPipe) id: string) {
    const requestUser = new User(req.user);

    await this.commentUseCases.deleteComment(id, requestUser);
  }
}
