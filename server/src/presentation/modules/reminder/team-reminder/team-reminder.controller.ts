import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CustomRequest } from 'src/presentation/common/types';
import { UpdateReminderDto, createReminderDto } from '../dtos';
import { Reminder, Task, User } from 'src/domain/entities';
import { TeamReminderUseCases } from 'src/application/use-cases/reminder/team-reminder/team-reminder.use-cases';

@Controller('team/:team_id/task/:task_id/reminder')
export class TeamReminderController {
  constructor(private readonly reminderUserCases: TeamReminderUseCases) {}

  @Post()
  createReminder(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Param('task_id', ParseUUIDPipe) task_id: string,

    @Body() reminderDto: createReminderDto,
  ) {
    const reminderInput = new Reminder(reminderDto);
    reminderInput.task = new Task({ id: task_id });
    const requestUser = new User(req.user);
    return this.reminderUserCases.createReminder(
      reminderInput,
      team_id,
      requestUser,
    );
  }
  @Patch(':reminder_id')
  updateReminder(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Param('task_id', ParseUUIDPipe) task_id: string,
    @Param('reminder_id', ParseUUIDPipe) reminder_id: string,

    @Body() reminderDto: UpdateReminderDto,
  ) {
    const reminderInput = new Reminder({ ...reminderDto, id: reminder_id });
    const requestUser = new User(req.user);
    return this.reminderUserCases.updateReminder(
      reminderInput,
      task_id,
      team_id,
      requestUser,
    );
  }

  @Delete(':reminder_id')
  async deleteReminder(
    @Req() req: CustomRequest,
    @Param('team_id', ParseUUIDPipe) team_id: string,
    @Param('task_id', ParseUUIDPipe) task_id: string,
    @Param('reminder_id', ParseUUIDPipe) reminder_id: string,
  ) {
    const requestedUser = new User(req.user);
    await this.reminderUserCases.deleteReminder(
      reminder_id,
      task_id,
      team_id,
      requestedUser,
    );
    return;
  }
}
