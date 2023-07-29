import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Reminder, User } from 'src/domain/entities';
import { ReminderUseCasesHelper } from './reminder-use-cases.helper';

@Injectable()
export class ReminderUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: ReminderUseCasesHelper,
  ) {}

  async createReminder(reminderInput: Reminder): Promise<Reminder> {
    let task = reminderInput.task;
    let receivers = reminderInput.receivers;
    const ids = receivers.map((receiver) => receiver.id);

    const resp = await Promise.all([
      await this.dataService.task.getById(task?.id),
      await this.dataService.user.getByIds(ids),
    ]);

    task = resp[0];

    if (!task) throw new NotFoundException('Task Not Found');

    receivers = resp[1];
    reminderInput.receivers = receivers;

    return this.dataService.reminder.create(reminderInput);
  }

  async updateReminder(
    id: string,
    reschedule: Date,
    requestedUser: User,
  ): Promise<Reminder> {
    if (reschedule <= new Date())
      throw new BadRequestException('Invalid Reschedule Value');

    const reminder = await this.dataService.reminder.getById(id);

    this.helper.validateOperation(reminder, requestedUser);

    reminder.scheduled_for = reschedule;
    return this.dataService.reminder.update(id, reminder);
  }

  async deleteReminder(id: string, requestedUser: User): Promise<void> {
    const reminder = await this.dataService.reminder.getById(id);

    this.helper.validateOperation(reminder, requestedUser);

    await this.dataService.reminder.delete(id);
  }
}
