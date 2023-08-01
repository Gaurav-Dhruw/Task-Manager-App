import { Module } from '@nestjs/common';
import { TeamTaskUseCases } from './team-task.use-cases';
import { TeamTaskHelperModule } from './helpers/team-task-helper.module';

@Module({
  imports: [TeamTaskHelperModule],
  providers: [TeamTaskUseCases],
  exports: [TeamTaskUseCases],
})
export class TeamTaskUseCasesModule {}
