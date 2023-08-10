import { Task, Team } from './';

export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  profile_pic?: string;
  is_verified: boolean;
  teams?: Team[];
  tasks?: Task[];

  constructor(options?: Partial<User>) {
    Object.assign(this, options);
  }
}
