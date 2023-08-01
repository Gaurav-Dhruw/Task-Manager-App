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
  validateInput(reminder: Reminder) {
    if (!reminder) throw new NotFoundException('Reminder Not Found');
  }

  validateOperation(schedule: Date): void {
    if (new Date(schedule) <= new Date())
      throw new BadRequestException('Past Scheduling Time');
  }

  checkTeamReminderAuthorization(task: Task, requestUser: User): void {
    const isTaskCreator = task.created_by.id === requestUser.id;
    const isAssigned: boolean = !!task?.assigned_to.find(
      (user) => user.id === requestUser.id,
    );

    if (!isTaskCreator || !isAssigned)
      throw new UnauthorizedException('User Unauthorized');
  }

  isTaskCreator(task: Task, requestUser: User) {
    if (task.created_by.id !== requestUser.id)
      throw new UnauthorizedException('User Unauthorized');
  }

  // Create Use-Case Helpers
  validateCreateInput(task: Task): void {
    if (!task) throw new NotFoundException('Task Not Found');
  }
}
