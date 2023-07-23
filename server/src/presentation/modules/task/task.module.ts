import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';

@Module({
  imports: [],
  providers: [TaskController],
})
export class TaskModule {}
