import { Module } from '@nestjs/common';
import { TaskUseCases } from './task.use-cases';
import { TaskUseCasesHelper } from './helpers/task-use-cases.helper';
import { TaskUseCasesHelperModule } from './helpers/task-use-cases-helper.module';

@Module({
  imports: [TaskUseCasesHelperModule],
  providers: [TaskUseCases],
  exports: [TaskUseCases],
})
export class TaskUseCasesModule {}
