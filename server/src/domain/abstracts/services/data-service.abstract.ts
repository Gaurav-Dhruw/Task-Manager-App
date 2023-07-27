import {
  ICommentRepository,
  INotificationRepository,
  IReminderRepository,
  ITaskRepository,
  ITeamRepository,
  IUserRepository,
} from '../';

export abstract class IDataService {
  user: IUserRepository;
  team: ITeamRepository;
  task: ITaskRepository;
  comment: ICommentRepository;
  reminder: IReminderRepository;
  notification: INotificationRepository;
}
