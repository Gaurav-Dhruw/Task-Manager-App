import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req, UsePipes } from '@nestjs/common';
import { Task, User } from 'src/domain/entities';
import { UpdateDtoValidationPipe } from 'src/presentation/common/pipes';
import { CustomRequest } from 'src/presentation/common/types';
import { CreatePersonalTaskDto, UpdatePersonalTaskDto, UpdatePersonalTaskResponseDto } from './dtos';
import { PersonalTaskUseCases } from 'src/application/use-cases/task/personal-task/personal-task.use-cases';

@Controller('user/personalTask')
export class PersonalTaskController {
  constructor(private readonly personalTaskUseCases: PersonalTaskUseCases) {}

  @Get(':id')
  getPersonalTask() {}

  @Post('create')
  createPersonalTask(
    @Req() req: CustomRequest,
    @Body() personalTaskDto: CreatePersonalTaskDto,
  ): Promise<Task> {
    const requestUser = new User(req.user);
    const personalTask = new Task(personalTaskDto);
    return this.personalTaskUseCases.createTask(personalTask, requestUser);
  }

//   @Get()
//   getPersonalTasks(@Req() req: CustomRequest): Promise<Task[]> {
//     return this.personalTaskUseCases.getPersonalTasks(req.user.id);
//   }

  @UsePipes(new UpdateDtoValidationPipe(['status', 'title']))
  @Patch('update')
  async updateTask(
    @Req() req: CustomRequest,
    @Body() personalTaskDto: UpdatePersonalTaskDto,
  ): Promise<UpdatePersonalTaskResponseDto> {
    const requestUser = new User(req.user);
    const personalTask = new Task(personalTaskDto);
    const updatedTask = await this.personalTaskUseCases.updateTask(personalTask, requestUser);
    const res = new UpdatePersonalTaskResponseDto(updatedTask);
 
    return res;
  }

  @Delete(':id')
  async deletePersonalTask(
    @Req() req: CustomRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    const requestUser = new User(req.user);
    await this.personalTaskUseCases.deleteTask(id, requestUser);
  }
}
