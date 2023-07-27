import { Team } from './';


export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  profile_pic?: string;
  teams?: Team[];

  constructor(data?: Partial<User>) {
    Object.assign(this,data);
  }
}
