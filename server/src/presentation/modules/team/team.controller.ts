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
  UsePipes,
} from '@nestjs/common';
import { TeamUseCases } from 'src/application/use-cases/team/team.use-cases';
import { Team, User } from 'src/domain/entities';
import {
  AddTeamAdminsDto,
  AddTeamMembersDto,
  CreateTeamDto,
  RemoveTeamMembersDto,
  UpdateTeamDto,
} from './dtos';
import { CustomRequest } from 'src/presentation/common/types';
import { UpdateTeamDtoValidationPipe } from './pipes';

@Controller('team')
export class TeamController {
  constructor(private readonly teamUseCases: TeamUseCases) {}

  // @Get()
  // getAllTeams() {
  //   return this.teamUseCases.getAllTeams();
  // }

  @Get(':id')
  findTeam(@Req() req: CustomRequest, @Param('id', ParseUUIDPipe) id: string) {
    const requestUser = new User(req.user);
    return this.teamUseCases.getTeam(id, requestUser);
  }

  @Get()
  findTeams(@Req() req: CustomRequest) {
    return this.teamUseCases.getTeamsWhereUser(req.user?.id);
  }

  @Post('create')
  async createTeam(@Req() req: CustomRequest, @Body() teamDto: CreateTeamDto) {
    const team = new Team(teamDto);
    const requestUser = new User(req.user);
    return this.teamUseCases.createTeam(team, requestUser);
  }

  @UsePipes(UpdateTeamDtoValidationPipe)
  @Patch('update')
  async updateTeam(@Req() req: CustomRequest, @Body() teamDto: UpdateTeamDto) {
    const team = new Team(teamDto);
    const requestUser = new User(req.user);
    return this.teamUseCases.updateTeam(team, requestUser);
  }

  @Patch('members/add')
  addMemebers(@Req() req: CustomRequest, @Body() teamDto: AddTeamMembersDto) {
    const requestUser = new User(req.user);
    return this.teamUseCases.addMembers(
      teamDto.id,
      teamDto.members,
      requestUser,
    );
  }

  @Patch('members/remove')
  removeMembers(
    @Req() req: CustomRequest,
    @Body() teamDto: RemoveTeamMembersDto,
  ) {
    const requestUser = new User(req.user);
    return this.teamUseCases.removeMembers(
      teamDto.id,
      teamDto.members,
      requestUser,
    );
  }

  @Patch('admins/add')
  makeAdmin(@Req() req: CustomRequest, @Body() teamDto: AddTeamAdminsDto) {
    const requestUser = new User(req.user);
    return this.teamUseCases.makeAdmin(teamDto.id, teamDto.admins, requestUser);
  }

  // @Patch('admins/remove')
  // removeAdmins(
  //   @Req() req: CustomRequest,
  //   @Body() teamDto: RemoveTeamAdminsDto,
  // ) {
  //   const requestUser = new User(req.user);
  //   return this.teamUseCases.removeAdmins(
  //     teamDto.id,
  //     teamDto.admins,
  //     requestUser,
  //   );
  // }

  // @Delete('delete/:id')
  // async deleteTeam(
  //   @Req() req: CustomRequest,
  //   @Param('id', ParseUUIDPipe) id: string,
  // ): Promise<void> {
  //   const requestUser = new User(req.user);
  //   await this.teamUseCases.deleteTeam(id, requestUser);
  //   return;
  // }
}
