import { Module } from '@nestjs/common';
import { PersonalReminderController } from './personal-reminder.controller';

@Module({
  controllers: [PersonalReminderController],
})
export class PersonalReminderModule {}
