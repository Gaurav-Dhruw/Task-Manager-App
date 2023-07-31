import { Module } from '@nestjs/common';
import { ReminderUseCases } from './reminder.use-cases';
import { ReminderUseCasesHelperModule } from './helpers/reminder-use-cases-helper.module';

@Module({
  imports: [ReminderUseCasesHelperModule],
  providers: [ReminderUseCases],
  exports: [ReminderUseCases],
})
export class ReminderUseCasesModule {}
