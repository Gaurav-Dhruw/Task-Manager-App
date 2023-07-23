import { Priority, Status } from '../types';
import { Reminder, Team, User } from './';

export class Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  created_by: User;
  assigned_to: User[];
  team: Team;
  reminder: Reminder;
}
