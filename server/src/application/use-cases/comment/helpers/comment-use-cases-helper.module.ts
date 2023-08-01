import { Module } from '@nestjs/common';
import { CommentUseCasesHelper } from './comment-use-cases.helper';
import { AuthorizationHelper } from './authorization.helper';
import { ValidateInputHelper } from './validate-input.helper';
import { ValidateOperationHelper } from './validate-operation-helper';

@Module({
  providers: [
    AuthorizationHelper,
    ValidateInputHelper,
    ValidateOperationHelper,
    CommentUseCasesHelper,
  ],
  exports: [AuthorizationHelper, CommentUseCasesHelper],
})
export class CommentUseCasesHelperModule {}
