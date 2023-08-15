import {
  ICommentRepository,
  INotificationRepository,
  IReminderRepository,
  ITaskRepository,
  ITeamRepository,
  IUserRepository,
} from '../';
import { IOtpRepository } from '../repositories/otp-repository.abstract';

export abstract class IDataService {
  abstract user: IUserRepository;
  abstract team: ITeamRepository;
  abstract task: ITaskRepository;
  abstract comment: ICommentRepository;
  abstract reminder: IReminderRepository;
  abstract notification: INotificationRepository;
  abstract otp: IOtpRepository;
}
