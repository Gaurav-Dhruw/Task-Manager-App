import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, Req } from '@nestjs/common';
import { ReminderUseCases } from 'src/application/use-cases/reminder/reminder.use-cases';
import { CustomRequest } from 'src/presentation/common/types';
import { UpdateReminderDto, createReminderDto } from './dtos';
import { Reminder, User } from 'src/domain/entities';

@Controller('reminder')
export class ReminderController {
  constructor(private readonly reminderUserCases: ReminderUseCases) {}

  @Post('create')
  createReminder(
    @Req() req: CustomRequest,
    @Body() reminderDto: createReminderDto,
  ) {
    const reminder = new Reminder(reminderDto);
    const requestUser = new User(req.user);
    return this.reminderUserCases.createReminder(reminder,requestUser);
  }
  @Patch('update')
  updateReminder(
    @Req() req: CustomRequest,
    @Body() reminderDto: UpdateReminderDto,
  ) {
    const id = reminderDto.id,
      rescheduleFor = reminderDto.reschedule_for;
    const requestUser = new User(req.user);
    return this.reminderUserCases.updateReminder(
      id,
      rescheduleFor,
      requestUser,
    );
  }

  @Delete(':id')
  async deleteReminder(
    @Req() req: CustomRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const requestedUser = new User(req.user);
    await this.reminderUserCases.deleteReminder(id, requestedUser);
    return;
  }
}
