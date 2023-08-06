import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { VerifyUserResponseDto } from './register-user.dto';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginUserResponseDto extends VerifyUserResponseDto {}
