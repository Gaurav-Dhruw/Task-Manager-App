import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reminder, Task, Team, User } from 'src/domain/entities';

@Injectable()
export class PersonalReminderHelper {
  constructor() {}
  // General Helpers
  validateMutateInput(reminder: Reminder, task: Task) {
    const errorMsgs: string[] = [];
    if (!reminder) errorMsgs.push('Reminder Not Found');
    if (!task) errorMsgs.push('Task Not Found');

    if (errorMsgs.length > 0) throw new NotFoundException(errorMsgs);
  }

  validateMutateOperation(reminder:Reminder, task:Task): void {
    if (reminder?.task.id !== task?.id) throw new BadRequestException();
  }

  validateReminderSchedule(schedule: Date) {
    if (new Date(schedule) <= new Date())
      throw new BadRequestException('Past Scheduling Time');
  }

  isTaskCreator(task: Task, requestUser: User) {
    if (task.created_by.id !== requestUser.id)
      throw new UnauthorizedException('User Unauthorized');
  }

  // Create Use-Case Helpers
  validateCreateInput(task: Task): void {
    if (!task) throw new NotFoundException('Task Not Found');
  }
  validateCreateOperation(task:Task):void{
    if(task && task.team) throw new BadRequestException();
  }
}
