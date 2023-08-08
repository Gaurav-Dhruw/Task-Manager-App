import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ReminderScheduler } from './reminder.scheduler';
import { ReminderSchedulerHelper } from './helpers/reminder.scheduler.helper';
import { IReminderScheduler } from 'src/domain/abstracts';

@Global()
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    ReminderSchedulerHelper,
    { provide: IReminderScheduler, useClass: ReminderScheduler },
  ],
  exports: [IReminderScheduler],
})
export class SchedulerModule {}
