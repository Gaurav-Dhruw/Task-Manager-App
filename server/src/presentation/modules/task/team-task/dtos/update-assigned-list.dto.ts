import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { User } from 'src/domain/entities';
import { GenericEntityDto } from 'src/presentation/common/dtos';

export class AssignToTaskDto {


  @ValidateNested({ each: true })
  @Type(() => GenericEntityDto)
  @ArrayMinSize(1)
  @IsArray()
  assign: User[];
}

export class UnassignFromTaskDto extends OmitType(AssignToTaskDto, ['assign']) {
  @ValidateNested({ each: true })
  @Type(() => GenericEntityDto)
  @ArrayMinSize(1)
  @IsArray()
  unassign: User[];
}
