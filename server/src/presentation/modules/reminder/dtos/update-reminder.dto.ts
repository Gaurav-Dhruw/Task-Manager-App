import {  IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateReminderDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsDateString()
  @IsNotEmpty()
  scheduled_for: Date;
}
