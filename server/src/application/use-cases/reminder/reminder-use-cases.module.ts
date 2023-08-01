import { Module } from '@nestjs/common';
import { PersonalReminderModule } from 'src/presentation/modules/reminder/personal-reminder/personal-reminder.module';
import { PersonalReminderUseCasesModule } from './personal-reminder/personal-reminder-use-cases.module';
import { TeamReminderUseCasesModule } from './team-reminder/team-reminder-use-cases.module';

@Module({
  imports: [PersonalReminderUseCasesModule, TeamReminderUseCasesModule],
  exports: [PersonalReminderUseCasesModule, TeamReminderUseCasesModule],
})
export class ReminderUseCasesModule {}
