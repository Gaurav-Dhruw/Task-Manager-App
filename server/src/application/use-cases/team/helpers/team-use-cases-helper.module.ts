import { Module } from '@nestjs/common';
import { TeamUseCasesHelper } from './team-use-cases.helper';

@Module({
  providers: [ TeamUseCasesHelper],
  exports: [ TeamUseCasesHelper],
})
export class TeamUseCasesHelperModule {}
