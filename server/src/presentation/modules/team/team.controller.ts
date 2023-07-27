import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { TeamUseCases } from 'src/application/use-cases/team/team.use-cases';
import { Team, User } from 'src/domain/entities';
import { CreateTeamDto, CreateTeamResponseDto } from './dtos';
import { CustomRequest } from 'src/presentation/common/types';

@Controller('team')
export class TeamController {
  constructor(private readonly teamUseCases: TeamUseCases) {}

  @Post('create')
  async createTeam(@Req() req:CustomRequest, @Body() teamDto: CreateTeamDto) {
    const team = new Team(teamDto);
    const teamCreator = new User(req.user);
    return this.teamUseCases.createTeam(team, teamCreator)
  }

//   addMemebers(@Body() teamDto: AddTeamMembersDto) {}

//   removeMemebers(@Body() teamDto: RemoveTeamMembersDto) {}

//   makeAdmins(@Body() teamDto: MakeTeamAdminDto) {}

//   removeAdmins(@Body() teamDto: RemoveTeamAdminsDto) {}


  @Delete('delete/:id')
  deleteTeam(@Param('id') id:string){

  }
}


