import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateReminderDto {
  @IsUUID()
  id: string;

  @IsDate()
  @IsNotEmpty()
  reschedule_for: Date;
}
