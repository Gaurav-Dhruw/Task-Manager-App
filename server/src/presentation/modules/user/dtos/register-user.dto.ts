import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsStrongPassword,
} from 'class-validator';
import { User } from 'src/domain/entities';
export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsStrongPassword()
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterUserResponseDto {
  id: string;
  email: string;
  name: string;
  profile_pic?: string;
  token: string;

  constructor(data?: Partial<User> & { token?: string }) {
    Object.assign(this, data);
  }
}
