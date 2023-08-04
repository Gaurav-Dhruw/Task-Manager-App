import { Notification } from 'src/domain/entities';

export abstract class IAppNotificationService {
  abstract sendReminderNotification(data: Notification): void;
}
