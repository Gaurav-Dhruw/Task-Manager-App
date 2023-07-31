import { Injectable } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Reminder, User } from 'src/domain/entities';
import { ReminderUseCasesHelper } from './helpers/reminder-use-cases.helper';

@Injectable()
export class ReminderUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: ReminderUseCasesHelper,
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

    // If team task,
    if (task.team) {
      const team = await this.dataService.team.getById(task.team.id);
      // Checks if user is either the task creator or task assgined user.
      this.helper.checkTeamReminderAuthorization(task, requestUser);
    }
    // If individual task,
    else {
      // Checks if user if the creator of the task
      this.helper.isOwner(task, requestUser);
    }

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

    // If it is a reminder of a team task,
    if (task.team) {
      // Checks if user is either the task creator or task assgined user.
      this.helper.checkTeamReminderAuthorization(task, requestUser);
    }
    // If it a reminder of individual task.
    else {
      // Checks if user is creator of the task.
      this.helper.isOwner(task, requestUser);
    }

    reminder.scheduled_for = reschedule;
    return this.dataService.reminder.update(id, reminder);
  }

  //Done
  async deleteReminder(id: string, requestUser: User): Promise<void> {
    const reminder = await this.dataService.reminder.getById(id);
    // Checks if the reminder exists.
    this.helper.validateInput(reminder);

    const task = await this.dataService.task.getById(reminder?.task.id);

    // If it is a reminder of a team task,
    if (task.team) {
      // Checks if user is either the task creator or task assgined user.
      this.helper.checkTeamReminderAuthorization(task, requestUser);
    }
    // If it a reminder of individual task.
    else {
      // Checks if user is creator of the task.
      this.helper.isOwner(task, requestUser);
    }

    await this.dataService.reminder.delete(id);
  }
}
