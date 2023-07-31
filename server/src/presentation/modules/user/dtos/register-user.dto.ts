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

  constructor(options?: Partial<User> & { token?: string }) {
    this.id = options?.id ?? this.id;
    this.email = options?.email ?? this.email;
    this.name = options?.name ?? this.name;
    this.profile_pic = options?.profile_pic ? options.profile_pic : null;
    this.token  = options?.token ?? this.token;
  }
}
