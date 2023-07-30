import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  ValidateNested,
  IsObject,
  ArrayMinSize,
  IsArray,
  IsUUID,
} from 'class-validator';
import { Task, User, Team } from 'src/domain/entities';
import { Priority, Status } from 'src/domain/types';
import { GenericEntityDto } from 'src/presentation/common/dtos';
import { CreateTaskDto } from './create-task.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UpdateTaskDto extends PartialType(
  OmitType(CreateTaskDto, [ 'team']),
) {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
