import { Module } from '@nestjs/common';
import { TeamReminderController } from './team-reminder.controller';

@Module({
  controllers: [TeamReminderController],
})
export class TeamReminderModule {}
