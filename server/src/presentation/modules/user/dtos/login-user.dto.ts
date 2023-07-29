import { IsEmail, IsNotEmpty, IsString } from "class-validator";
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
  tasks?: Task[];

  constructor(data?: Partial<User> & { token?: string }) {
    Object.assign(this, data);
  }
}
