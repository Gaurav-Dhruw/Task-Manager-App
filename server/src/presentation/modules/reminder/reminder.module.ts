import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';

@Module({
  imports: [],
  providers: [ReminderController],
})
export class ReminderModule {}
