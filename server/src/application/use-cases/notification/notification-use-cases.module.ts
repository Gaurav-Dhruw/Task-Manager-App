import { Module } from '@nestjs/common';
import { NotificationUseCases } from './notification.use-cases';
import { NotificationUseCasesHelperModule } from './helpers/notification-use-cases-helper.module';

@Module({
  imports:[NotificationUseCasesHelperModule],
  providers: [NotificationUseCases],
  exports: [NotificationUseCases],
})
export class NotificationUseCasesModule {}
