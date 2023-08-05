import { IEmailNotificationService } from './email-notification-service.abstract';
import { IAppNotificationService } from './app-notification-service.abstract';
import { EmailTemplate, NotificationTemplate } from 'src/domain/types';
import { Reminder, Notification } from 'src/domain/entities';

export abstract class INotificationService {
  abstract email: IEmailNotificationService;
  abstract app: IAppNotificationService;

  abstract toTemplateString(data: NotificationTemplate): string;
  abstract remindersToNotifications(reminders: Reminder[]): Notification[];
  abstract notificationsToEmailOptions(
    notifications: Notification[],
  ): EmailTemplate[];
}
