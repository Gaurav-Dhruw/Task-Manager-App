import { Body, Controller, Delete, Param, ParseUUIDPipe, Patch, Post, Req } from '@nestjs/common';
import { CustomRequest } from 'src/presentation/common/types';
import { UpdateReminderDto, createReminderDto } from '../dtos';
import { Reminder, User } from 'src/domain/entities';
import { PersonalReminderUseCases } from 'src/application/use-cases/reminder/personal-reminder/personal-reminder.use-cases';

@Controller('reminder')
export class PersonalReminderController {
  constructor(private readonly reminderUserCases: PersonalReminderUseCases) {}

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
    rescheduleFor = reminderDto.scheduled_for;
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
