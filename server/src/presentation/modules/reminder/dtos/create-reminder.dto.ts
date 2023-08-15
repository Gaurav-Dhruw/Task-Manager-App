import { IsNotEmpty, IsDateString, MinDate } from 'class-validator';

export class CreateReminderDto {
  @IsDateString()
  @IsNotEmpty()
  scheduled_for: Date;
}
