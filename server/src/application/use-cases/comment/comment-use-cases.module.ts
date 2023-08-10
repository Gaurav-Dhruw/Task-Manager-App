import { Module } from '@nestjs/common';
import { CommentUseCases } from './comment.use-cases';
import { CommentUseCasesHelperModule } from './helpers/comment-use-cases-helper.module';

@Module({
  imports: [CommentUseCasesHelperModule],
  providers: [CommentUseCases],
  exports: [CommentUseCases],
})
export class CommentUseCasesModule {}
