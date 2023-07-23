import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';

@Module({
  imports: [],
  providers: [TeamController],
})
export class TeamModule {}
