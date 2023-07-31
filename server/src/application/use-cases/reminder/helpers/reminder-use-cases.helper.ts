import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reminder, Task, User } from 'src/domain/entities';
import { ValidateOperationHelper } from './validate-operation.helper';

@Injectable()
export class ReminderUseCasesHelper {
  constructor(
    private readonly validateOperationHelper: ValidateOperationHelper,
  ) {}

  validateCreateOperation(task: Task, schedule: Date): void {
    this.validateOperationHelper.validateTask(task);
    this.validateOperationHelper.validateSchedule(schedule);
  }

  validateUpdateOperation(reminder: Reminder, schedule: Date): void {
    this.validateOperationHelper.validateReminder(reminder);
    this.validateOperationHelper.validateSchedule(schedule);
  }

  validateDeleteOperation(reminder: Reminder): void {
    this.validateOperationHelper.validateReminder(reminder);
  }

  checkAuthorization(task: Task, requestUser: User): void {
    const isAuthorized: boolean =
      task?.created_by.id === requestUser.id ||
      !!task?.assigned_to.find((user) => user.id === requestUser.id);

    if (!isAuthorized) throw new UnauthorizedException('User Unauthorized');
  }
}
