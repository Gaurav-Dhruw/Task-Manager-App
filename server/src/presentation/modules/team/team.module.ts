import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';

@Module({
  controllers: [TeamController],
})
export class TeamModule {}
