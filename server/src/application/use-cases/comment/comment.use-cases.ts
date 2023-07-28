import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IDataService } from "src/domain/abstracts";
import { Comment } from "src/domain/entities";
import { CommentUseCasesHelper } from "./comment-use-cases.helper";

@Injectable()
export class CommentUseCases {
  constructor(private readonly dataService: IDataService,private readonly helper: CommentUseCasesHelper) {}

  createComment(commentInput: Comment): Promise<Comment> {
    return this.dataService.comment.create(commentInput);
  }

  async updateComment(commentInput: Comment): Promise<Comment> {
    const comment = await this.dataService.comment.getById(commentInput.id);
    if (!comment) throw new NotFoundException('Comment Not Found');
    
    const requestedUser = commentInput.user;
    this.helper.checkAuthorization(comment, requestedUser);

    return this.dataService.comment.create(commentInput);
  }

  async deleteComment(commentInput: Comment): Promise<void> {
    const comment = await this.dataService.comment.getById(commentInput.id);
    if (!comment) throw new NotFoundException('Comment Not Found');
    
    const requestedUser = commentInput.user;
    this.helper.checkAuthorization(commentInput, requestedUser);

    await this.dataService.comment.delete(commentInput.id);
  }
}