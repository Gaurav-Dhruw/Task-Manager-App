import { IsDate, IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateReminderDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsDateString()
  @IsNotEmpty()
  reschedule_for: Date;
}
