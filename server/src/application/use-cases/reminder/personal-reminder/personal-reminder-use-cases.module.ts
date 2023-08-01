import { Module } from '@nestjs/common';
import { PersonalReminderUseCases } from './personal-reminder.use-cases';
import { PersonalReminderHelperModule } from './helpers/personal-reminder-helper.module';

@Module({
  imports: [PersonalReminderHelperModule],
  providers: [PersonalReminderUseCases],
  exports: [PersonalReminderUseCases],
})
export class PersonalReminderUseCasesModule {}
