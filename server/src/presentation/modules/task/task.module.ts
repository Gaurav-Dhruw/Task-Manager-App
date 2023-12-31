import { Module } from '@nestjs/common';
import { PersonalTaskModule } from './personal-task/personal-task.module';
import { TeamTaskModule } from './team-task/team-task.module';
// import { TaskController } from './task.controller';

@Module({
  imports: [PersonalTaskModule, TeamTaskModule],
  exports: [PersonalTaskModule, TeamTaskModule],
  // controllers: [TaskController],
})
export class TaskModule {}
