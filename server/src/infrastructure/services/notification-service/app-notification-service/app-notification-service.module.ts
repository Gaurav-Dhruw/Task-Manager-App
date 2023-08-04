import { Module } from '@nestjs/common';
import { IAppNotificationService } from 'src/domain/abstracts';
import { AppNotificationService } from './app-notification.service';

@Module({
  imports: [],
  providers: [{
    provide:IAppNotificationService,
    useClass:AppNotificationService
  }],
  exports: [IAppNotificationService],
})
export class AppNotificationServiceModule {}
