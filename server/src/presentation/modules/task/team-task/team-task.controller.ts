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
import { Task, User } from 'src/domain/entities';
import { UpdateDtoValidationPipe } from 'src/presentation/common/pipes';
import { CustomRequest } from 'src/presentation/common/types';
import {
  CreateTeamTaskDto,
  UpdateTeamTaskDto,
  UpdateTeamTaskResponseDto,
  AssignToTaskDto,
  UnassignFromTaskDto,
} from './dtos';
import { TeamTaskUseCases } from 'src/application/use-cases/task/team-task/team-task.use-cases';

@Controller('team/:team_id/task')
export class TeamTaskController {
  constructor(private readonly taskUseCases: TeamTaskUseCases) {}

  @Get(':task_id')
  getTeamTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Param('task_id', ParseUUIDPipe) task_id: string,
  ) {
    const requestUser = new User(req.user);
    return this.taskUseCases.getTask(task_id, team_id, requestUser);
  }

  @Get()
  getTeamTasks(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
  ): Promise<Task[]> {
    const requestUser = new User(req.user);
    return this.taskUseCases.getAllTasks(team_id, requestUser);
  }

  @Post()
  createTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Body() taskDto: CreateTeamTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    const task = new Task(taskDto);
    return this.taskUseCases.createTask(task, team_id, requestUser);
  }

  @UsePipes(new UpdateDtoValidationPipe(['status', 'title']))
  @Patch('update')
  async updateTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Body() taskDto: UpdateTeamTaskDto,
  ): Promise<UpdateTeamTaskResponseDto> {
    const requestUser = new User(req.user);
    const task = new Task(taskDto);
    const updatedTask = await this.taskUseCases.updateTask(
      task,
      team_id,
      requestUser,
    );
    const res = new UpdateTeamTaskResponseDto(updatedTask);
    console.log(res);
    return res;
  }

  @Patch('/assign')
  assignTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Body() taskDto: AssignToTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    return this.taskUseCases.assignTask(
      taskDto.id,
      taskDto.assign,
      team_id,
      requestUser,
    );
  }

  @Patch('/unassign')
  unassignTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,

    @Body() taskDto: UnassignFromTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    return this.taskUseCases.unassignTask(
      taskDto.id,
      taskDto.unassign,
      team_id,
      requestUser,
    );
  }

  @Delete(':task_id')
  async deleteTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,

    @Param('task_id', ParseUUIDPipe) task_id: string,
  ): Promise<void> {
    const requestUser = new User(req.user);
    await this.taskUseCases.deleteTask(task_id, team_id, requestUser);
  }
}
