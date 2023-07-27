import { Task, User } from 'src/domain/entities';

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
