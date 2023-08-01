import { Module } from '@nestjs/common';
import { TeamTaskHelper } from './team-task.helper';
import { AuthorizationHelper } from './authorization.helper';
import { ValidateInputHelper } from './validate-input.helper';
import { ValidateOperationHelper } from './validate-operation.helper';

@Module({
  providers: [AuthorizationHelper, ValidateInputHelper, ValidateOperationHelper, TeamTaskHelper],
  exports: [TeamTaskHelper],
})
export class TeamTaskHelperModule {}
