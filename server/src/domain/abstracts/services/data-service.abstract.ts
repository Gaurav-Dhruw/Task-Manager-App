import {
  ICommentRepository,
  INotificationRepository,
  IReminderRepository,
  ITaskRepository,
  ITeamRepository,
  IUserRepository,
} from '../';

export abstract class IDataService {
  abstract user: IUserRepository;
  abstract team: ITeamRepository;
  abstract task: ITaskRepository;
  abstract comment: ICommentRepository;
  abstract reminder: IReminderRepository;
  abstract notification: INotificationRepository;
}
