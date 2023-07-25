import { Task } from "src/domain/entities";

export class LoginUserResponseDto {
  id: string;
  email: string;
  name: string;
  profile_pic?: string;
  token: string;
  tasks?: Task[];

  constructor(data?: {
    id?: string;
    email?: string;
    name?: string;
    profile_pic?: string;
    token?: string;
    tasks?:Task[]
  }) {
    this.id = data?.id;
    this.email = data?.email;
    this.name = data?.name;
    this.profile_pic = data?.profile_pic;
    this.token = data?.token;
    this.tasks = data?.tasks;
  }
}
