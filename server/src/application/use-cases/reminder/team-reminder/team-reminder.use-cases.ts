import { Injectable } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Reminder, User, Comment } from 'src/domain/entities';
import { TeamReminderHelper } from './helpers/team-reminder.helper';

@Injectable()
export class TeamReminderUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly helper: TeamReminderHelper,
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
    this.helper.validateCreateInput(team, task);
    // Checks for team task and their enitities connection.
    this.helper.validateCreateOperation(team, task);

    // Checks if user is either the task creator or task assgined user.
    this.helper.checkAuthorization(team, task, requestUser);

    // Validates schedule if its an upcomming date/time or not.
    this.helper.validateReminderSchedule(schedule);

    inputReminder.receivers = task.assigned_to;
    return this.dataService.reminder.create(inputReminder);
  }

  //Done
  async updateReminder(
    inputReminder: Reminder,
    task_id: string,
    team_id: string,
    requestUser: User,
  ): Promise<Reminder> {
    const { id: reminder_id } = inputReminder;

    const [reminder, task, team] = await Promise.all([
      await this.dataService.reminder.getById(reminder_id),
      await this.dataService.task.getById(task_id),
      await this.dataService.team.getById(team_id),
    ]);

    // Checks if the reminder exists.
    this.helper.validateMutateInput(team, task, reminder);
    // Checks for team task and each enitities connection.
    this.helper.validateMutateOperation(team, task, reminder);

    // Checks if user is either the task creator or task assgined user.
    this.helper.checkAuthorization(team, task, requestUser);

    // If it a reminder of individual task.

    return this.dataService.reminder.update(reminder.id, reminder);
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
    // Checks if the reminder exists.
    this.helper.validateMutateInput(team, task, reminder);
    // Checks for team task and each enitities connection.
    this.helper.validateMutateOperation(team, task, reminder);

    // Checks if user is either the task creator or task assgined user.
    this.helper.checkAuthorization(team, task, requestUser);

    await this.dataService.reminder.delete(reminder_id);
  }
}
