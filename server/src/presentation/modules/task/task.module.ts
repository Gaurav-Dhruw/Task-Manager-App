import { Module } from '@nestjs/common';
import { PersonalTaskModule } from './personal-task/personal-task.module';
import { TeamTaskModule } from './team-task/team-task.module';

@Module({
  imports: [PersonalTaskModule, TeamTaskModule],
  exports: [PersonalTaskModule, TeamTaskModule],
})
export class TaskModule {}
