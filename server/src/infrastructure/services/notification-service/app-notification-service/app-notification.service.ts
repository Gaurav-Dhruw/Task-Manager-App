import { Injectable } from '@nestjs/common';
import { IAppNotificationService } from 'src/domain/abstracts';

@Injectable()
export class AppNotificationService implements IAppNotificationService {
  constructor() {}

  sendReminderNotification(): void {}
}
