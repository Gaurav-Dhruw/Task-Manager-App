import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req, UsePipes } from '@nestjs/common';
import { Task, User } from 'src/domain/entities';
import { UpdateDtoValidationPipe } from 'src/presentation/common/pipes';
import { CustomRequest } from 'src/presentation/common/types';
import { CreateTeamTaskDto, UpdateTeamTaskDto, UpdateTeamTaskResponseDto, AssignToTaskDto, UnassignFromTaskDto } from './dtos';
import { TeamTaskUseCases } from 'src/application/use-cases/task/team-task/team-task.use-cases';

@Controller('team/:team_id/task')
export class TeamTaskController {
  constructor(private readonly teamTaskUseCases: TeamTaskUseCases) {}

  @Get(':id')
  getTeamTask() {}

  @Post('create')
  createTask(
    @Req() req: CustomRequest,
    @Body() taskDto: CreateTeamTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    const task = new Task(taskDto);
    return this.teamTaskUseCases.createTask(task, requestUser);
  }

  @Get('assigned')
  getTasks(@Req() req: CustomRequest): Promise<Task[]> {
    return this.teamTaskUseCases.getTasks(req.user.id);
  }

  @UsePipes(new UpdateDtoValidationPipe(['status', 'title']))
  @Patch('update')
  async updateTask(
    @Req() req: CustomRequest,
    @Body() taskDto: UpdateTeamTaskDto,
  ): Promise<UpdateTeamTaskResponseDto> {
    const requestUser = new User(req.user);
    const task = new Task(taskDto);
    const updatedTask = await this.teamTaskUseCases.updateTask(
      task,
      requestUser,
    );
    const res = new UpdateTeamTaskResponseDto(updatedTask);
    console.log(res);
    return res;
  }

  @Patch('/assign')
  assignTask(
    @Req() req: CustomRequest,
    @Body() taskDto: AssignToTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    return this.teamTaskUseCases.assignTask(
      taskDto.id,
      taskDto.assign,
      requestUser,
    );
  }

  @Patch('/unassign')
  unassignTask(
    @Req() req: CustomRequest,
    @Body() taskDto: UnassignFromTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    return this.teamTaskUseCases.unassignTask(
      taskDto.id,
      taskDto.unassign,
      requestUser,
    );
  }

  @Delete(':id')
  async deleteTask(
    @Req() req: CustomRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    const requestUser = new User(req.user);
    await this.teamTaskUseCases.deleteTask(id, requestUser);
  }
}
