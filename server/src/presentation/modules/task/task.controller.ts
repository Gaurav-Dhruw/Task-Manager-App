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
import { TaskUseCases } from 'src/application/use-cases/task/task.use-cases';
import { CustomRequest } from 'src/presentation/common/types';
import {
  AssignToTaskDto,
  CreateTaskDto,
  UnassignFromTaskDto,
  UpdateTaskDto,
  UpdateTaskResponseDto,
} from './dtos';
import { Task, User } from 'src/domain/entities';
import { UpdateDtoValidationPipe } from 'src/presentation/common/pipes';

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

  @Get('assigned')
  getTasks(@Req() req: CustomRequest): Promise<Task[]> {
    return this.taskUseCases.getTasks(req.user.id);
  }

  

  @UsePipes(new UpdateDtoValidationPipe(['status', 'title']))
  @Patch('update')
  async updateTask(
    @Req() req: CustomRequest,
    @Body() taskDto: UpdateTaskDto,
  ): Promise<UpdateTaskResponseDto> {
    const requestUser = new User(req.user);
    const task = new Task(taskDto);
    const updatedTask = await this.taskUseCases.updateTask(task, requestUser);
    const res = new UpdateTaskResponseDto(updatedTask);
    console.log(res);
    return res;
  }

  @Patch('/assign')
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

  @Patch('/unassign')
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
    await this.taskUseCases.deleteTask(id, requestUser);
  }
}
