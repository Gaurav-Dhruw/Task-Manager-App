import { Injectable } from '@nestjs/common';
import { IDataService, IReminderScheduler } from 'src/domain/abstracts';
import { Reminder, User } from 'src/domain/entities';
import { TeamReminderHelper } from './helpers/team-reminder.helper';

@Injectable()
export class TeamReminderUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: TeamReminderHelper,
    private readonly reminderScheduler: IReminderScheduler,
  ) {}
  //Done
  async createReminder(
    inputReminder: Reminder,
    team_id: string,
    requestUser: User,
  ): Promise<Reminder> {
    const task_id = inputReminder.task?.id;
    const schedule = inputReminder.scheduled_for;

    const [task, team] = await Promise.all([
      await this.dataService.task.getById(task_id),
      await this.dataService.team.getById(team_id),
    ]);

    // Checks if valid task and team is provided
    // And team and task have connection.
    this.helper.validateCreateInput(team, task);

    // Checks if user is either the task creator or assgined to the task.
    this.helper.checkAuthorization(team, task, requestUser);

    // Checks if receivers are present.
    this.helper.checkIfReceiversPresent(task);
    // Validates schedule if its an upcomming date/time or not.
    this.helper.validateReminderSchedule(schedule);

    inputReminder.receivers = task.assigned_to;
    const reminder = await this.dataService.reminder.create(inputReminder);

    this.reminderScheduler.scheduleReminder(reminder);

    return reminder;
  }

  //Done
  async updateReminder(
    inputReminder: Reminder,
    task_id: string,
    team_id: string,
    requestUser: User,
  ): Promise<Reminder> {
    const { id: reminder_id, scheduled_for: schedule } = inputReminder;

    const [reminder, task, team] = await Promise.all([
      await this.dataService.reminder.getById(reminder_id),
      await this.dataService.task.getById(task_id),
      await this.dataService.team.getById(team_id),
    ]);

    // Checks if the reminder, task and team exists.
    // And all of them have connection.
    this.helper.validateMutateInput(team, task, reminder);

    // Checks if user is either the task creator or assgined to the task.
    this.helper.checkAuthorization(team, task, requestUser);

    // Checks if receivers are present.
    this.helper.checkIfReceiversPresent(task);
    // Validates schedule if its an upcomming date/time or not.
    this.helper.validateReminderSchedule(schedule);

    reminder.scheduled_for = schedule;
    
    const updatedReminder = await this.dataService.reminder.update(
      reminder.id,
      reminder,
    );
    this.reminderScheduler.updateSchedule(updatedReminder);

    return updatedReminder;
  }

  //Done
  async deleteReminder(
    reminder_id: string,
    task_id: string,
    team_id: string,
    requestUser: User,
  ): Promise<void> {
    const [reminder, task, team] = await Promise.all([
      await this.dataService.reminder.getById(reminder_id),
      await this.dataService.task.getById(task_id),
      await this.dataService.team.getById(team_id),
    ]);
    // Checks if the reminder, task and team exists.
    // And all of them have connection.
    this.helper.validateMutateInput(team, task, reminder);

    // Checks if user is either the task creator or assgined to the task.
    this.helper.checkAuthorization(team, task, requestUser);

    await this.dataService.reminder.delete(reminder_id);
    this.reminderScheduler.deleteScheduledReminder(reminder_id);
  }
}
