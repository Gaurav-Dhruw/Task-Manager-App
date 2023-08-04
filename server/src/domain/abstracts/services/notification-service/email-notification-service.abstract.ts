import { Notification } from 'src/domain/entities';

export abstract class IEmailNotificationService {
  abstract sendWelcomeMail(data: Notification): Promise<void>;
  abstract sendConfirmationMail(data: Notification): Promise<void>;
  abstract sendReminderMail(data: Notification): void;
}
