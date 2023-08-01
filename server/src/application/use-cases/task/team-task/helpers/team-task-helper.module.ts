import { Module } from '@nestjs/common';
import { TeamTaskHelper } from './team-task.helper';

@Module({
  providers: [TeamTaskHelper],
  exports: [TeamTaskHelper],
})
export class TeamTaskHelperModule {}
