import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Task, Team, User } from 'src/domain/entities';
import { Priority } from 'src/domain/types';
import { GenericEntityDto } from 'src/presentation/common/dtos';

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

  @IsDate()
  @IsOptional()
  deadline?: Date;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @ValidateNested()
  @Type(() => GenericEntityDto)
  @IsObject()
  @IsOptional()
  team?: Team;
}