import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
  ArrayMinSize,
  IsDateString,
} from 'class-validator';
import { Task, User } from 'src/domain/entities';
import { GenericEntityDto } from 'src/presentation/common/dtos';

export class createReminderDto {
  @ValidateNested()
  @Type(() => GenericEntityDto)
  @IsNotEmptyObject()
  task: Task;

  @IsDateString()
  @IsNotEmpty()
  scheduled_for: Date;
}
