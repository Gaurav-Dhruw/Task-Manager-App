import { Module } from '@nestjs/common';

import { PersonalReminderUseCasesModule } from './personal-reminder/personal-reminder-use-cases.module';
import { TeamReminderUseCasesModule } from './team-reminder/team-reminder-use-cases.module';

@Module({
  imports: [PersonalReminderUseCasesModule, TeamReminderUseCasesModule],
  exports: [PersonalReminderUseCasesModule, TeamReminderUseCasesModule],
})
export class ReminderUseCasesModule {}
