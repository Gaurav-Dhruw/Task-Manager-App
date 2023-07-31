import { Module } from '@nestjs/common';
import { NotificationUseCasesHelper } from './notification-use-cases.helper';

@Module({
  providers: [NotificationUseCasesHelper],
  exports: [NotificationUseCasesHelper],
})
export class NotificationUseCasesHelperModule {};