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
  Query
} from '@nestjs/common';
import { Task, User } from 'src/domain/entities';
import { RequestQueryPipe, UpdateDtoValidationPipe } from 'src/presentation/common/pipes';
import { CustomRequest } from 'src/presentation/common/types';
import { CreateTaskDto, SearchTasksDto, UpdateTaskDto, UpdateTaskResponseDto } from '../dtos';
import { GetPersonalTaskResponseDto } from './dtos';
import { PersonalTaskUseCases } from 'src/application/use-cases/task/personal-task/personal-task.use-cases';
import { IRequestQuery } from 'src/domain/types/request-query.type';

@Controller('user/task')
export class PersonalTaskController {
  constructor(private readonly taskUseCases: PersonalTaskUseCases) {}

  @Get('list')
  findAllTasks(@Req() req: CustomRequest, @Query(RequestQueryPipe) query: SearchTasksDto): Promise<Task[]> {
    return this.taskUseCases.getAssignedTasks(req.user.id, query as any);
  }

  @Get(':task_id')
  async findPersonalTask(
    @Req() req: CustomRequest,
    @Param('task_id', ParseUUIDPipe) task_id: string,
  ): Promise<GetPersonalTaskResponseDto> {
    const requestUser = new User(req.user);
    const task = await this.taskUseCases.getTask(task_id, requestUser);
    return new GetPersonalTaskResponseDto(task);
  }

  @Post()
  createPersonalTask(
    @Req() req: CustomRequest,
    @Body() taskDto: CreateTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    const taskInput = new Task(taskDto);
    return this.taskUseCases.createTask(taskInput, requestUser);
  }

  @UsePipes(
    new UpdateDtoValidationPipe({ nonEmptyFields: ['status', 'title'] }),
  )
  @Patch(':task_id')
  async updateTask(
    @Req() req: CustomRequest,
    @Param('task_id', ParseUUIDPipe) task_id: string,
    @Body() taskDto: UpdateTaskDto,
  ): Promise<UpdateTaskResponseDto> {
    const requestUser = new User(req.user);
    const personalTask = new Task({ ...taskDto, id: task_id });
    const updatedTask = await this.taskUseCases.updateTask(
      personalTask,
      requestUser,
    );
    const res = new UpdateTaskResponseDto(updatedTask);

    return res;
  }

  @Delete(':task_id')
  async deletePersonalTask(
    @Req() req: CustomRequest,
    @Param('task_id', ParseUUIDPipe) task_id: string,
  ): Promise<void> {
    const requestUser = new User(req.user);
    await this.taskUseCases.deleteTask(task_id, requestUser);
  }
}
