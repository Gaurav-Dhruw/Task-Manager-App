import { Module } from '@nestjs/common';
import { PersonalTaskUseCasesModule } from './personal-task/personal-task-use-cases.module';
import { TeamTaskUseCasesModule } from './team-task/team-task-use-cases.module';
import { TaskUseCases } from './task.use-cases';

@Module({
  imports: [PersonalTaskUseCasesModule, TeamTaskUseCasesModule],
  providers: [TaskUseCases],
  exports: [PersonalTaskUseCasesModule, TeamTaskUseCasesModule],
})
export class TaskUseCasesModule {}
