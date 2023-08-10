import { Module } from '@nestjs/common';
import { PersonalTaskUseCases } from './personal-task.use-cases';
import { PersonalTaskHelperModule } from './helpers/personal-task-helper.module';

@Module({
  imports: [PersonalTaskHelperModule],
  providers: [PersonalTaskUseCases],
  exports: [PersonalTaskUseCases],
})
export class PersonalTaskUseCasesModule {}
