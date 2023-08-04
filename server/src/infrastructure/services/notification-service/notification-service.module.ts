import { Module } from '@nestjs/common';
import { INotificationService } from 'src/domain/abstracts';
import { NotificationService } from './notification.service';
import { AppNotificationServiceModule } from './app-notification-service/app-notification-service.module';
import { EmailNotificationServiceModule } from './email-notification-service/email-notification-service.module';

@Module({
  imports :[AppNotificationServiceModule, EmailNotificationServiceModule],
  providers: [
    {
      provide: INotificationService,
      useClass: NotificationService,
    },
  ],
  exports: [INotificationService],
})
export class NotificationServiceModule {}
