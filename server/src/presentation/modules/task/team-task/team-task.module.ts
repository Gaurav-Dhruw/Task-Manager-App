import { Module } from '@nestjs/common';
import { TeamTaskController } from './team-task.controller';

@Module({
  controllers: [TeamTaskController],
})
export class TeamTaskModule {}
