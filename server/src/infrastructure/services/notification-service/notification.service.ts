import { Injectable } from '@nestjs/common';
import {
  IAppNotificationService,
  IEmailNotificationService,
  INotificationService,
} from 'src/domain/abstracts';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    readonly email: IEmailNotificationService,
    readonly app: IAppNotificationService,
  ) {}
}
