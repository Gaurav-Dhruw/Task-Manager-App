import {
  IsStrongPassword,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { UpdateUserResponseDto } from './update-user.dto';
import { User } from 'src/domain/entities';

export class UpdateCredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  new_email?: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class UpdateCredentialsResponseDto extends UpdateUserResponseDto {
  constructor(options?: Partial<User>) {
    super(options);
  }
}
