import { OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Task, Team, User } from 'src/domain/entities';
import { RegisterUserDto, RegisterUserResponseDto } from './register-user.dto';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginUserResponseDto extends RegisterUserResponseDto {}
