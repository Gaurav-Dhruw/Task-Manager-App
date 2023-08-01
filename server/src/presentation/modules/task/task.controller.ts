import { Controller, Get, Req } from '@nestjs/common';
import { TaskUseCases } from 'src/application/use-cases/task/task.use-cases';
import { CustomRequest } from 'src/presentation/common/types';

import { Task } from 'src/domain/entities';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskUseCases: TaskUseCases) {}

  @Get()
  getTasks(@Req() req: CustomRequest): Promise<Task[]> {
    return this.taskUseCases.getTasks(req.user.id);
  }
}
