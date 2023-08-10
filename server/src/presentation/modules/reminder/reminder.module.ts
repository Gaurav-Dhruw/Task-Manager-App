import { Module } from '@nestjs/common';
import { PersonalReminderModule } from './personal-reminder/personal-reminder.module';
import { TeamReminderModule } from './team-reminder/team-reminder.module';
// import { ReminderController } from './reminder.controller';

@Module({
  imports: [PersonalReminderModule, TeamReminderModule],
  exports: [PersonalReminderModule, TeamReminderModule],
})
export class ReminderModule {}
