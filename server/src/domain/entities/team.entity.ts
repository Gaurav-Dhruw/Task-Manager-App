import { Task, User } from "./";

export class Team {
  id: string;
  team_name: string;
  display_pic?: string;
  admins: User[];
  members: User[];
  tasks?:Task[];
}