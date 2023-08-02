import {

  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class createReminderDto {

  @IsDateString()
  @IsNotEmpty()
  scheduled_for: Date;
}
