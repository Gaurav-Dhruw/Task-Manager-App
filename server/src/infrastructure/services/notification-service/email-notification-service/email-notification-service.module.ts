import { Module } from '@nestjs/common';
import { IEmailNotificationService } from 'src/domain/abstracts';
import { EmailNotificationService } from './email-notification.service';

@Module({
  imports: [],
  providers: [
    {
      provide: IEmailNotificationService,
      useClass: EmailNotificationService,
    },
  ],
  exports: [IEmailNotificationService],
})
export class EmailNotificationServiceModule {}
