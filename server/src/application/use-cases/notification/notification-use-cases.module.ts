import { Module } from '@nestjs/common';
import { NotificationUseCases } from './notification.use-cases';
import { NotificationUseCasesHelper } from './notification-use-cases.helper';

@Module({
  providers: [NotificationUseCases, NotificationUseCasesHelper],
  exports: [NotificationUseCases],
})
export class NotificationUseCasesModule {}
