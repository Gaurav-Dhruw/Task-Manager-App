import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profile_pic?: string;
}

export class UpdateUserCredentialsDto extends PartialType(
  OmitType(RegisterUserDto, ['name']),
) {}
