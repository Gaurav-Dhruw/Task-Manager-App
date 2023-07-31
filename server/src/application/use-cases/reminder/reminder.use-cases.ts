import {
  Injectable,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Reminder, User } from 'src/domain/entities';
import { ReminderUseCasesHelper } from './helpers/reminder-use-cases.helper';

@Injectable()
export class ReminderUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: ReminderUseCasesHelper,
  ) {}

  async createReminder(
    reminderInput: Reminder,
    requestUser: User,
  ): Promise<Reminder> {
    const inputTask = reminderInput.task;
    const task = await this.dataService.task.getById(inputTask?.id);

    this.helper.validateCreateOperation(task, reminderInput.scheduled_for);
    this.helper.checkAuthorization(task, requestUser);

    reminderInput.receivers = task.assigned_to;
    return this.dataService.reminder.create(reminderInput);
  }

  async updateReminder(
    id: string,
    reschedule: Date,
    requestUser: User,
  ): Promise<Reminder> {
    const reminder = await this.dataService.reminder.getById(id);
    this.helper.validateUpdateOperation(reminder, reschedule);

    const task = await this.dataService.task.getById(reminder.task.id);
    this.helper.checkAuthorization(task, requestUser);

    reminder.scheduled_for = reschedule;
    return this.dataService.reminder.update(id, reminder);
  }

  async deleteReminder(id: string, requestUser: User): Promise<void> {
    const reminder = await this.dataService.reminder.getById(id);
    this.helper.validateDeleteOperation(reminder);
    const task = await this.dataService.task.getById(reminder?.task.id);
    this.helper.checkAuthorization(task, requestUser);

    await this.dataService.reminder.delete(id);
  }
}
