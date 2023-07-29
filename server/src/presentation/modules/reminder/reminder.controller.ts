import { Body, Controller, Param, ParseUUIDPipe, Req } from '@nestjs/common';
import { ReminderUseCases } from 'src/application/use-cases/reminder/reminder.use-cases';
import { CustomRequest } from 'src/presentation/common/types';
import { UpdateReminderDto, createReminderDto } from './dtos';
import { Reminder, User } from 'src/domain/entities';

@Controller()
export class ReminderController {
  constructor(private readonly reminderUserCases: ReminderUseCases) {}

  createReminder(
    @Req() req: CustomRequest,
    @Body() reminderDto: createReminderDto,
  ) {
    const reminder = new Reminder(reminderDto);
    reminder.created_by = new User(req.user);

    return this.reminderUserCases.createReminder(reminder);
  }

  updateReminder(
    @Req() req: CustomRequest,
    @Body() reminderDto: UpdateReminderDto,
  ) {
    const id = reminderDto.id,
      rescheduleFor = reminderDto.reschedule_for;
    const requestedUser = new User(req.user);
    return this.reminderUserCases.updateReminder(
      id,
      rescheduleFor,
      requestedUser,
    );
  }

  async deleteReminder(
    @Req() req: CustomRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const requestedUser = new User(req.user);
    await this.reminderUserCases.deleteReminder(id, requestedUser);
    return {message: `Reminder ${id} deleted`};
  }
}
