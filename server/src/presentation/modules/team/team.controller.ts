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
  UpdateTeamResponseDto,
} from './dtos';
import { CustomRequest } from 'src/presentation/common/types';
import { UpdateDtoValidationPipe } from 'src/presentation/common/pipes';

@Controller('team')
export class TeamController {
  constructor(private readonly teamUseCases: TeamUseCases) {}

  // @Get()
  // getAllTeams() {
  //   return this.teamUseCases.getAllTeams();
  // }

  @Get(':team_id')
  findTeam(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
  ) {
    const requestUser = new User(req.user);
    return this.teamUseCases.getTeam(team_id, requestUser);
  }

  @Get()
  findAllTeams(@Req() req: CustomRequest) {
    return this.teamUseCases.getAllTeams(req.user?.id);
  }

  @Post()
  async createTeam(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Body() teamDto: CreateTeamDto,
  ) {
    const team = new Team({ ...teamDto, id: team_id });
    const requestUser = new User(req.user);
    return this.teamUseCases.createTeam(team, requestUser);
  }

  @UsePipes(new UpdateDtoValidationPipe(['team_name']))
  @Patch(':team_id')
  async updateTeam(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Body() teamDto: UpdateTeamDto,
  ): Promise<UpdateTeamResponseDto> {
    const team = new Team({ ...teamDto, id: team_id });
    const requestUser = new User(req.user);
    const updatedTeam = await this.teamUseCases.updateTeam(team, requestUser);
    return new UpdateTeamResponseDto(updatedTeam);
  }

  @Patch(':team_id/members/add')
  addMemebers(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Body() teamDto: AddTeamMembersDto,
  ) {
    const requestUser = new User(req.user);
    return this.teamUseCases.addMembers(team_id, teamDto.members, requestUser);
  }

  @Patch(':team_id/members/remove')
  removeMembers(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Body() teamDto: RemoveTeamMembersDto,
  ) {
    const requestUser = new User(req.user);
    return this.teamUseCases.removeMembers(
      team_id,
      teamDto.members,
      requestUser,
    );
  }

  @Patch(':team_id/admins/add')
  makeAdmin(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Body() teamDto: AddTeamAdminsDto,
  ) {
    const requestUser = new User(req.user);
    return this.teamUseCases.makeAdmin(team_id, teamDto.admins, requestUser);
  }

  @Delete(':team_id')
  async deleteTeam(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
  ): Promise<void> {
    const requestUser = new User(req.user);
    await this.teamUseCases.deleteTeam(team_id, requestUser);
    return;
  }
}
