import { Injectable } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Reminder, User } from 'src/domain/entities';
import { PersonalReminderHelper } from './helpers/personal-reminder.helper';

@Injectable()
export class PersonalReminderUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: PersonalReminderHelper,
  ) {}
  //Done
  async createReminder(
    reminderInput: Reminder,
    requestUser: User,
  ): Promise<Reminder> {
    const inputTask = reminderInput.task;
    const schedule = reminderInput.scheduled_for;
    const task = await this.dataService.task.getById(inputTask.id);

    // Checks if valid task is provided
    this.helper.validateCreateInput(task);

    // Checks if user is the creator of the task
    this.helper.isTaskCreator(task, requestUser);

    // Validates schedule if its an upcomming date/time or not.
    this.helper.validateOperation(schedule);

    reminderInput.receivers = task.assigned_to;
    return this.dataService.reminder.create(reminderInput);
  }

  //Done
  async updateReminder(
    id: string,
    reschedule: Date,
    requestUser: User,
  ): Promise<Reminder> {
    const reminder = await this.dataService.reminder.getById(id);
    // Checks if the reminder exists.
    this.helper.validateInput(reminder);

    const task = await this.dataService.task.getById(reminder.task.id);

    // Checks if user is creator of the task.
    this.helper.isTaskCreator(task, requestUser);

    reminder.scheduled_for = reschedule;
    return this.dataService.reminder.update(id, reminder);
  }

  //Done
  async deleteReminder(id: string, requestUser: User): Promise<void> {
    const reminder = await this.dataService.reminder.getById(id);
    // Checks if the reminder exists.
    this.helper.validateInput(reminder);

    const task = await this.dataService.task.getById(reminder?.task.id);

    // If it a reminder of individual task.
    this.helper.isTaskCreator(task, requestUser);

    await this.dataService.reminder.delete(id);
  }
}
