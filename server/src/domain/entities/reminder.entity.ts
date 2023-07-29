import { Task, User } from "./";

export class Reminder {
  id: string;
  created_by:User;
  receivers: User[];
  task: Task;
  scheduled_for: Date;

  constructor(data?: Partial<Reminder>) {
    Object.assign(this, data);
  }
}