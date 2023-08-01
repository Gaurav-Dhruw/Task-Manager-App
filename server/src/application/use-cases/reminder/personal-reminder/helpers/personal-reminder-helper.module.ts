import { Module } from '@nestjs/common';
import { PersonalReminderHelper } from './personal-reminder.helper';

@Module({
  providers: [PersonalReminderHelper],
  exports: [PersonalReminderHelper],
})
export class PersonalReminderHelperModule {}
