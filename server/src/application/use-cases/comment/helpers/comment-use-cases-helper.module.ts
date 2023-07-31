import { Module } from '@nestjs/common';
import { CommentUseCasesHelper } from './comment-use-cases.helper';
import { AuthorizationHelper } from './authorization.helper';
import { ValidateOperationHelper } from './validate-input.helper';

@Module({
  providers: [
    AuthorizationHelper,
    ValidateOperationHelper,
    CommentUseCasesHelper,
  ],
  exports: [AuthorizationHelper, CommentUseCasesHelper],
})
export class CommentUseCasesHelperModule {}
