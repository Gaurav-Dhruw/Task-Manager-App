import { Module } from '@nestjs/common';
import { TeamUseCases } from './team.use-cases';
import { TeamUseCasesHelper } from './helpers/team-use-cases.helper';

@Module({
  providers: [TeamUseCases, TeamUseCasesHelper],
  exports: [TeamUseCases],
})
export class TeamUseCasesModule {}
