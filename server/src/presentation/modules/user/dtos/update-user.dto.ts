import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  profile_pic?: string;
}

export class UpdateUserCredentialsDto extends PartialType(
  OmitType(RegisterUserDto, ['name']),
) {}
