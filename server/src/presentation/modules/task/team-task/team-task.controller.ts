import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { Task, User } from 'src/domain/entities';
import {
  RequestQueryPipe,
  UpdateDtoValidationPipe,
} from 'src/presentation/common/pipes';
import { CustomRequest } from 'src/presentation/common/types';
import { AssignToTaskDto, UnassignFromTaskDto } from './dtos';

import {
  CreateTaskDto,
  SearchTasksDto,
  UpdateTaskDto,
  UpdateTaskResponseDto,
} from '../dtos';
import { TeamTaskUseCases } from 'src/application/use-cases/task/team-task/team-task.use-cases';

@Controller('team/:team_id/task')
export class TeamTaskController {
  constructor(private readonly taskUseCases: TeamTaskUseCases) {}

  @Get('list')
  findAllTeamTasks(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Query(RequestQueryPipe) query: SearchTasksDto,
  ): Promise<Task[]> {
    const requestUser = new User(req.user);

    return this.taskUseCases.getAllTasks(team_id, requestUser, query as any);
  }

  @Get(':task_id')
  findTeamTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Param('task_id', ParseUUIDPipe) task_id: string,
  ) {
    const requestUser = new User(req.user);
    return this.taskUseCases.getTask(task_id, team_id, requestUser);
  }

  @Post()
  createTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,

    @Body() taskDto: CreateTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    const task = new Task(taskDto);
    return this.taskUseCases.createTask(task, team_id, requestUser);
  }

  @UsePipes(
    new UpdateDtoValidationPipe({ nonEmptyFields: ['status', 'title'] }),
  )
  @Patch(':task_id')
  async updateTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Param('task_id', ParseUUIDPipe) task_id: string,

    @Body() taskDto: UpdateTaskDto,
  ): Promise<UpdateTaskResponseDto> {
    const requestUser = new User(req.user);
    const task = new Task({ ...taskDto, id: task_id });
    const updatedTask = await this.taskUseCases.updateTask(
      task,
      team_id,
      requestUser,
    );

    return new UpdateTaskResponseDto(updatedTask);
  }

  @Patch(':task_id/assign')
  assignTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Param('task_id', ParseUUIDPipe) task_id: string,

    @Body() taskDto: AssignToTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    return this.taskUseCases.assignTask(
      task_id,
      taskDto.assign,
      team_id,
      requestUser,
    );
  }

  @Patch(':task_id/unassign')
  unassignTask(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Param('task_id', ParseUUIDPipe) task_id: string,

    @Body() taskDto: UnassignFromTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    return this.taskUseCases.unassignTask(
      task_id,
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
