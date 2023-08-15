import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Task } from 'src/domain/entities';
import { Priority } from 'src/domain/types';

export class CreateTaskDto
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
