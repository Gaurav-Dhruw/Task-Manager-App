import { Reminder, Task, Team, User, Comment } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class IDataService {
  users: IGenericRepository<User>;
  teams: IGenericRepository<Team>;
  tasks: IGenericRepository<Task>;
  comments: IGenericRepository<Comment>;
  reminders: IGenericRepository<Reminder>;
  notifications: IGenericRepository<Notification>;
}
