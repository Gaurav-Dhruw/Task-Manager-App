import { Module } from '@nestjs/common';
import { TeamReminderHelper } from './team-reminder.helper';


@Module({
  providers: [TeamReminderHelper],
  exports: [ TeamReminderHelper],
})
export class TeamReminderHelperModule {};