import { Module } from '@nestjs/common';
import { ReminderUseCasesHelper } from './reminder-use-cases.helper';


@Module({
  providers: [ReminderUseCasesHelper],
  exports: [ ReminderUseCasesHelper],
})
export class ReminderUseCasesHelperModule {};