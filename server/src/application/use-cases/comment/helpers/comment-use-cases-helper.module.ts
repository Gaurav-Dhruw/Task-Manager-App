import { Module } from '@nestjs/common';
import { CommentUseCasesHelper } from './comment-use-cases.helper';
import { AuthorizationHelper } from './authorization.helper';

@Module({
  providers: [
    AuthorizationHelper,
    CommentUseCasesHelper,
  ],
  exports: [AuthorizationHelper, CommentUseCasesHelper],
})
export class CommentUseCasesHelperModule {}
