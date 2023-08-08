import { EmailTemplate } from 'src/domain/types';

export abstract class IEmailNotificationService {
  abstract sendMails(data: EmailTemplate[]): Promise<void>;
}
