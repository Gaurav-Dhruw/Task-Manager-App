import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsStrongPassword,
} from 'class-validator';

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
