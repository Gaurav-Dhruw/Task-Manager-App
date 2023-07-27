import { User } from "src/domain/entities";

export class RegisterUserResponseDto {
  id: string;
  email: string;
  name: string;
  profile_pic?: string;
  token: string;

  constructor(data?: Partial<User> & {token?:string}) {
   Object.assign(this,data);
  }
}
