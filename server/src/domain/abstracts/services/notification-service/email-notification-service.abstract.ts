import { IGenericEmailTemplate } from 'src/domain/types';

export abstract class IEmailNotificationService {
  abstract sendMails(data: IGenericEmailTemplate[]): Promise<void>;
}
