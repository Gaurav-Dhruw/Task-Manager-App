import { Module } from '@nestjs/common';
import { PersonalTaskHelper } from './personal-task.helper';

@Module({
  providers: [PersonalTaskHelper],
  exports: [PersonalTaskHelper],
})
export class PersonalTaskHelperModule {}
