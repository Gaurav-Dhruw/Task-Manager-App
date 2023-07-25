import { Module } from '@nestjs/common';
import { INotificationService } from 'src/domain/abstracts';
import { NotificationService } from './notification.service';

@Module({
  providers: [
    {
      provide: INotificationService,
      useClass: NotificationService,
    },
  ],
  exports: [INotificationService],
})
export class NotificationServiceModule {}
