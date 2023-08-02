import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reminder, Task, Team, User } from 'src/domain/entities';

@Injectable()
export class TeamReminderHelper {
  constructor() {}

  // General Helpers

  checkAuthorization(team: Team, task: Task, requestUser: User): void {
    const isAdmin: boolean = !!team.admins.find(
      (admin) => admin.id === requestUser.id,
    );
    const isTaskCreator = task.created_by.id === requestUser.id;
    const isAssigned: boolean = !!task?.assigned_to.find(
      (user) => user.id === requestUser.id,
    );

    if (!(isAdmin || isTaskCreator || isAssigned))
      throw new UnauthorizedException('User Unauthorized');
  }

  // Mutate Use-Cases Helpers
  validateMutateInput(team: Team, task: Task, reminder: Reminder) {
    const errorMsgs: string[] = [];

    if (!team) errorMsgs.push('Team Not Found');
    if (!task) errorMsgs.push('Task Not Found');
    if (!reminder) errorMsgs.push('Reminder Not Found');

    if (errorMsgs.length > 0) throw new NotFoundException(errorMsgs);
  }

  validateMutateOperation(team: Team, task: Task, reminder: Reminder) {
    const reminderBelongsToTheTask: boolean = reminder.task.id === task.id;
    const taskBelongsToTheTeam: boolean = task.team?.id === team.id;

    if (!reminderBelongsToTheTask || !taskBelongsToTheTeam) {
      throw new BadRequestException();
    }
  }

  validateReminderSchedule(schedule: Date): void {
    if (new Date(schedule) <= new Date())
      throw new BadRequestException('Past Scheduling Time');
  }

  // Create Use-Case Helpers
  validateCreateInput(team: Team, task: Task): void {
    const errorMsgs: string[] = [];

    if (!team) errorMsgs.push('Team Not Found');
    if (!task) errorMsgs.push('Task Not Found');

    if (errorMsgs.length > 0) throw new NotFoundException(errorMsgs);
  }

  validateCreateOperation(team: Team, task: Task) {
    if (task.team?.id !== team.id) throw new BadRequestException();
  }
}
