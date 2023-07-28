import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { TeamUseCases } from 'src/application/use-cases/team/team.use-cases';
import { Team, User } from 'src/domain/entities';
import { CreateTeamDto, CreateTeamResponseDto } from './dtos';
import { CustomRequest } from 'src/presentation/common/types';
import { AddTeamMembersDto } from './dtos/add-team-members.dto';
import { RemoveTeamMembersDto } from './dtos/remove-team-members.dto';
import { RemoveTeamAdminsDto } from './dtos/remove-team-admins.dto';
import { AddTeamAdminsDto } from './dtos/make-team-admin.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamUseCases: TeamUseCases) {}

  @Get()
  getAllTeams() {
    return this.teamUseCases.getAllTeams();
  }
  @Post('create')
  async createTeam(@Req() req: CustomRequest, @Body() teamDto: CreateTeamDto) {
    const team = new Team(teamDto);
    const teamCreator = new User(req.user);
    return this.teamUseCases.createTeam(team, teamCreator);
  }

  @Patch('members/add')
  addMemebers(@Body() teamDto: AddTeamMembersDto) {
    return this.teamUseCases.addMembers(teamDto.id, teamDto.members);
  }

  @Patch('members/remove')
  removeMembers(@Body() teamDto: RemoveTeamMembersDto) {
    return this.teamUseCases.removeMembers(teamDto.id, teamDto.members);
  }

  @Patch('admins/add')
  makeAdmins(@Body() teamDto: AddTeamAdminsDto) {
    return this.teamUseCases.addAdmins(teamDto.id, teamDto.admins);
  }

  @Patch('admins/remove')
  removeAdmins(@Body() teamDto: RemoveTeamAdminsDto) {
    return this.teamUseCases.removeAdmins(teamDto.id, teamDto.admins);
  }

  @Delete('delete/:id')
  deleteTeam(@Param('id', ParseUUIDPipe)  id: string) {
    return this.teamUseCases.deleteTeam(id);
  }
}
