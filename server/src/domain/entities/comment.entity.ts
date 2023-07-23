import { User, Task } from './';

export class Comment {
  id: string;
  content: string;
  created_at: Date;
  user: User;
  task: Task;
}
