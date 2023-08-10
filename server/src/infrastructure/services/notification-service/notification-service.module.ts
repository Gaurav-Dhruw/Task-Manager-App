import { Module } from '@nestjs/common';
import { INotificationService, ITemplateEngine } from 'src/domain/abstracts';
import { NotificationService } from './notification.service';
import { AppNotificationServiceModule } from './app-notification-service/app-notification-service.module';
import { EmailNotificationServiceModule } from './email-notification-service/email-notification-service.module';
import { TemplateEngine } from './template-engine';

@Module({
  imports: [AppNotificationServiceModule, EmailNotificationServiceModule],
  providers: [
    {
      provide: ITemplateEngine,
      useClass: TemplateEngine,
    },
    {
      provide: INotificationService,
      useClass: NotificationService,
    },
  ],
  exports: [INotificationService, ITemplateEngine],
})
export class NotificationServiceModule {}
