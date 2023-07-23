import { User } from "./";

export class Team {
  id: string;
  team_name: string;
  admins: User[];
  members: User[];
  display_pic: string;
}