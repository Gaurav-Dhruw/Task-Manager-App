import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateReminderDto {
  @IsDateString()
  @IsNotEmpty()
  scheduled_for: Date;
}
