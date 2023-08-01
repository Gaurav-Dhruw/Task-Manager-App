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
    reminderInput: Reminder,
    team_id: string,
    requestUser: User,
  ): Promise<Reminder> {
    const inputTask = reminderInput.task;
    const schedule = reminderInput.scheduled_for;
    const [task, team] = await Promise.all([
      await this.dataService.task.getById(inputTask.id),
      await this.dataService.team.getById(team_id),
    ]);

    // Checks if valid task is provided
    this.helper.validateCreateInput(task, team);

    // Checks if user is either the task creator or task assgined user.
    this.helper.checkAuthorization(team,task, requestUser);

    // Validates schedule if its an upcomming date/time or not.
    this.helper.validateOperation(schedule);

    reminderInput.receivers = task.assigned_to;
    return this.dataService.reminder.create(reminderInput);
  }

  //Done
  async updateReminder(
    reminderInput:Reminder,
    team_id:string,
    requestUser: User,
  ): Promise<Reminder> {
    const [reminder, task, team] = await Promise.all([
      await this.dataService.reminder.getById(reminderInput.id),
      await this.dataService.task.getById(reminderInput.task.id),
      await this.dataService.team.getById(team_id),
    ]);
    
    // Checks if the reminder exists.
    this.helper.validateInput(team , task, reminder);

 
      // Checks if user is either the task creator or task assgined user.
      this.helper.checkAuthorization(team,task, requestUser);
  
    // If it a reminder of individual task.

    return this.dataService.reminder.update(reminder.id, reminder);
  }

  //Done
  async deleteReminder(id: string,team_id:string, task_id:string, requestUser: User): Promise<void> {
   const [reminder, task, team] = await Promise.all([
     await this.dataService.reminder.getById(id),
     await this.dataService.task.getById(task_id),
     await this.dataService.team.getById(team_id),
   ]);
    
    // Checks if the reminder exists.
    this.helper.validateInput(team,task,reminder);


      // Checks if user is either the task creator or task assgined user.
      this.helper.checkAuthorization(team,task, requestUser);
  
    await this.dataService.reminder.delete(id);
  }
}
