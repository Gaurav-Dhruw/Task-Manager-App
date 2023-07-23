import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';

@Module({
  imports: [],
  providers: [NotificationController],
})
export class NotificationModule {}
