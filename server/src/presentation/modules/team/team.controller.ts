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
  addMemebers(@Req() req: CustomRequest, @Body() teamDto: AddTeamMembersDto) {
    const requestedUser = new User(req.user);
    return this.teamUseCases.addMembers(
      teamDto.id,
      teamDto.members,
      requestedUser,
    );
  }

  @Patch('members/remove')
  removeMembers(
    @Req() req: CustomRequest,
    @Body() teamDto: RemoveTeamMembersDto,
  ) {
    const requestedUser = new User(req.user);
    return this.teamUseCases.removeMembers(
      teamDto.id,
      teamDto.members,
      requestedUser,
    );
  }

  @Patch('admins/add')
  makeAdmins(@Req() req: CustomRequest, @Body() teamDto: AddTeamAdminsDto) {
    const requestedUser = new User(req.user);
    return this.teamUseCases.addAdmins(
      teamDto.id,
      teamDto.admins,
      requestedUser,
    );
  }

  @Patch('admins/remove')
  removeAdmins(
    @Req() req: CustomRequest,
    @Body() teamDto: RemoveTeamAdminsDto,
  ) {
    const requestedUser = new User(req.user);
    return this.teamUseCases.removeAdmins(
      teamDto.id,
      teamDto.admins,
      requestedUser,
    );
  }

  @Delete('delete/:id')
  async deleteTeam(
    @Req() req: CustomRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const requestedUser = new User(req.user);
    await this.teamUseCases.deleteTeam(id, requestedUser);
    return { message: `Team with id: ${id} deleted.` };
  }
}
