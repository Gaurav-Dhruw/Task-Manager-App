import {

  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Task } from 'src/domain/entities';
import { Priority } from 'src/domain/types';

export class CreatePersonalTaskDto
  implements Omit<Task, 'id' | 'status' | 'assigned_to' | 'created_by'>
{
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  deadline?: Date;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;
}
