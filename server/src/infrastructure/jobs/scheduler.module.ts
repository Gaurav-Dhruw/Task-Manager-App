import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ReminderScheduler } from './reminder.scheduler';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [ReminderScheduler],
})
export class SchedulerModule {}
