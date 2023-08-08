import { Notification } from 'src/domain/entities';

export abstract class IAppNotificationService {
  abstract sendNotifications(notifications: Notification[]): Promise<void>;
}
