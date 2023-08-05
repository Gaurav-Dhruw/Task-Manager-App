import { Module } from '@nestjs/common';

import { PersonalReminderUseCasesModule } from './personal-reminder/personal-reminder-use-cases.module';
import { TeamReminderUseCasesModule } from './team-reminder/team-reminder-use-cases.module';
import { ReminderUseCases } from './reminder.use-cases';

@Module({
  imports: [PersonalReminderUseCasesModule, TeamReminderUseCasesModule],
  providers: [ReminderUseCases],
  exports: [
    PersonalReminderUseCasesModule,
    TeamReminderUseCasesModule,
    ReminderUseCases,
  ],
})
export class ReminderUseCasesModule {}
