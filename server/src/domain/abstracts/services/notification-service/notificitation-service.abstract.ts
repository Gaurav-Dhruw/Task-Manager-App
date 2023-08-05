import { IEmailNotificationService } from './email-notification-service.abstract';
import { IAppNotificationService } from './app-notification-service.abstract';
import { NotificationTemplate } from 'src/domain/types';

export abstract class INotificationService {
  abstract email: IEmailNotificationService;
  abstract app: IAppNotificationService;

  abstract toTemplateString(data: NotificationTemplate): string;
}
