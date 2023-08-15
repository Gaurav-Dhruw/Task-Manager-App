import { Injectable } from '@nestjs/common';
import { IDataService, IReminderScheduler } from 'src/domain/abstracts';
import { Reminder, User } from 'src/domain/entities';
import { PersonalReminderHelper } from './helpers/personal-reminder.helper';

@Injectable()
export class PersonalReminderUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: PersonalReminderHelper,
    private readonly reminderScheduler: IReminderScheduler,
  ) {}

  //Done
  async createReminder(
    inputReminder: Reminder,
    requestUser: User,
  ): Promise<Reminder> {
    const task_id = inputReminder.task?.id;
    const schedule = inputReminder.scheduled_for;
    const task = await this.dataService.task.getById(task_id);

    // Checks if valid task is provided.
    this.helper.validateCreateInput(task);
    // Checks for team tasks.
    this.helper.validateCreateOperation(task);

    // Checks if user is the creator of the task
    this.helper.isTaskCreator(task, requestUser);

    // Validates schedule if its an upcomming date/time or not.
    this.helper.validateReminderSchedule(schedule);

    inputReminder.receivers = task.assigned_to;

    const reminder = await this.dataService.reminder.create(inputReminder);

    this.reminderScheduler.scheduleReminder({ ...reminder, task });

    return reminder;
  }

  //Done
  async updateReminder(
    inputReminder: Reminder,
    task_id: string,
    requestUser: User,
  ): Promise<Reminder> {
    const { id: reminder_id, scheduled_for: reschedule } = inputReminder;

    const [reminder, task] = await Promise.all([
      await this.dataService.reminder.getById(reminder_id),
      await this.dataService.task.getById(task_id),
    ]);

    // Checks if the reminder and task exists.
    this.helper.validateMutateInput(reminder, task);

    // Checks if the reminder belongs to the provided task.
    this.helper.validateMutateOperation(reminder, task);

    // Checks if user is creator of the task.
    this.helper.isTaskCreator(task, requestUser);

    // Validates schedule if its an upcomming date/time or not.
    this.helper.validateReminderSchedule(reschedule);

    reminder.scheduled_for = reschedule;
    const updatedReminder = await this.dataService.reminder.update(
      reminder_id,
      reminder,
    );
    this.reminderScheduler.updateSchedule(updatedReminder);
    return updatedReminder;
  }

  //Done
  async deleteReminder(
    id: string,
    task_id: string,
    requestUser: User,
  ): Promise<void> {
    const [reminder, task] = await Promise.all([
      await this.dataService.reminder.getById(id),
      await this.dataService.task.getById(task_id),
    ]);

    // Checks if the reminder and task exists.
    this.helper.validateMutateInput(reminder, task);
    // Checks if the reminder belongs to the provided task.
    this.helper.validateMutateOperation(reminder, task);
    // If it a reminder of individual task.
    this.helper.isTaskCreator(task, requestUser);

    await this.dataService.reminder.delete(id);
    this.reminderScheduler.deleteScheduledReminder(id);
  }
}
