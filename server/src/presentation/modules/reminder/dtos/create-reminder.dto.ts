import { Type } from 'class-transformer';
import {

  IsNotEmpty,
  IsNotEmptyObject,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Task } from 'src/domain/entities';
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
