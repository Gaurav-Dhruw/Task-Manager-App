import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Task, User } from 'src/domain/entities';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginUserResponseDto {
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
    this.token = options?.token ?? this.token;
  }
}
