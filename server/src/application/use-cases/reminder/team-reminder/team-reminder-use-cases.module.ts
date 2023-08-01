import { Module } from '@nestjs/common';
import { TeamReminderUseCases } from './team-reminder.use-cases';
import { TeamReminderHelperModule } from './helpers/team-reminder-helper.module';

@Module({
  imports: [TeamReminderHelperModule],
  providers: [TeamReminderUseCases],
  exports: [TeamReminderUseCases],
})
export class TeamReminderUseCasesModule {}
