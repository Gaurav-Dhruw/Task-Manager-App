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
import { PersonalReminderUseCases } from 'src/application/use-cases/reminder/personal-reminder/personal-reminder.use-cases';

@Controller('user/task/:task_id/reminder')
export class PersonalReminderController {
  constructor(private readonly reminderUserCases: PersonalReminderUseCases) {}

  @Post()
  createReminder(
    @Req() req: CustomRequest,
    @Param('task_id', ParseUUIDPipe) task_id: string,
    @Body() reminderDto: createReminderDto,
  ) {
    const reminder = new Reminder(reminderDto);
    reminder.task = new Task({ id: task_id });
    const requestUser = new User(req.user);
    return this.reminderUserCases.createReminder(reminder, requestUser);
  }
  
  @Patch(':reminder_id')
  updateReminder(
    @Req() req: CustomRequest,
    @Param('task_id', ParseUUIDPipe) task_id: string,
    @Param('reminder_id', ParseUUIDPipe) reminder_id: string,

    @Body() reminderDto: UpdateReminderDto,
  ) {
    const inputReminder = new Reminder({ ...reminderDto, id: reminder_id });
    const requestUser = new User(req.user);
    return this.reminderUserCases.updateReminder(
      inputReminder,
      task_id,
      requestUser,
    );
  }

  @Delete(':reminder_id')
  async deleteReminder(
    @Req() req: CustomRequest,
    @Param('task_id', ParseUUIDPipe) task_id: string,
    @Param('reminder_id', ParseUUIDPipe) reminder_id: string,
  ) {
    const requestUser = new User(req.user);
    await this.reminderUserCases.deleteReminder(
      reminder_id,
      task_id,
      requestUser,
    );
    return;
  }
}
