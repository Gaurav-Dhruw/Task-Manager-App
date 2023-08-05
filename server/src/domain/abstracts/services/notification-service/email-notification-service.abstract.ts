import { EmailTemplate } from 'src/domain/types';

export abstract class IEmailNotificationService {
  abstract sendMail(data: EmailTemplate): Promise<void>;
  // abstract sendConfirmationMail(data: EmailTemplate): Promise<void>;
  // abstract sendReminderMail(data: EmailTemplate): Promise<void>;
}
