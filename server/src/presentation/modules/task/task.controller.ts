import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req } from '@nestjs/common';
import { TaskUseCases } from 'src/application/use-cases/task/task.use-cases';
import { CustomRequest } from 'src/presentation/common/types';
import {
  AssignToTaskDto,
  CreateTaskDto,
  UnassignFromTaskDto,
  UpdateTaskDto,
} from './dtos';
import { Task, User } from 'src/domain/entities';

@Controller('task')
export class TaskController {
  constructor(private readonly taskUseCases: TaskUseCases) {}

  @Post('create')
  createTask(
    @Req() req: CustomRequest,
    @Body() taskDto: CreateTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    const task = new Task(taskDto);
    return this.taskUseCases.createTask(task, requestUser);
  }

  @Get()
  getTasks(@Req() req: CustomRequest): Promise<Task[]> {
    return this.taskUseCases.getTasks(req.user.id);
  }

  @Patch('update')
  updateTask(
    @Req() req: CustomRequest,
    @Body() taskDto: UpdateTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    const task = new Task(taskDto);
    return this.taskUseCases.updateTask(task, requestUser);
  }

  @Patch('update/assign')
  assignTask(
    @Req() req: CustomRequest,
    @Body() taskDto: AssignToTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    return this.taskUseCases.assignTask(
      taskDto.id,
      taskDto.assign,
      requestUser,
    );
  }

  @Patch('update/unassign')
  unassignTask(
    @Req() req: CustomRequest,
    @Body() taskDto: UnassignFromTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    return this.taskUseCases.unassignTask(
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
    await this.taskUseCases.deleteTask(
      id,
      requestUser,
    );
  }
}
