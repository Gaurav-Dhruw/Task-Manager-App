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
  CreatePersonalTaskDto,
  GetPersonalTaskResponseDto,
  UpdatePersonalTaskDto,
  UpdatePersonalTaskResponseDto,
} from './dtos';
import { PersonalTaskUseCases } from 'src/application/use-cases/task/personal-task/personal-task.use-cases';

@Controller('user/task')
export class PersonalTaskController {
  constructor(private readonly taskUseCases: PersonalTaskUseCases) {}

  @Get(':task_id')
  async getPersonalTask(
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
    @Body() personalTaskDto: CreatePersonalTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    const personalTask = new Task(personalTaskDto);
    return this.taskUseCases.createTask(personalTask, requestUser);
  }


  @UsePipes(new UpdateDtoValidationPipe(['status', 'title']))
  @Patch()
  async updateTask(
    @Req() req: CustomRequest,
    @Body() personalTaskDto: UpdatePersonalTaskDto,
  ): Promise<UpdatePersonalTaskResponseDto> {
    const requestUser = new User(req.user);
    const personalTask = new Task(personalTaskDto);
    const updatedTask = await this.taskUseCases.updateTask(
      personalTask,
      requestUser,
    );
    const res = new UpdatePersonalTaskResponseDto(updatedTask);

    return res;
  }

  @Delete(':task_id')
  async deletePersonalTask(
    @Req() req: CustomRequest,
    @Param('id', ParseUUIDPipe) task_id: string,
  ): Promise<void> {
    const requestUser = new User(req.user);
    await this.taskUseCases.deleteTask(task_id, requestUser);
  }
}
