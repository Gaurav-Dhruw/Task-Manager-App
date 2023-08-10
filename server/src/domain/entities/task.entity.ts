import { Priority, Status } from '../types';
import { Comment, Reminder, Team, User } from './';

export class Task {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  status: Status;
  priority?: Priority;
  created_by: User;
  assigned_to: User[];
  team?: Team;
  comments?: Comment[];
  reminders?: Reminder[];

  constructor(data?: Partial<Task>) {
    Object.assign(this, data);
  }
}
