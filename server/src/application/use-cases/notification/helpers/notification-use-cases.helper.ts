import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Notification, User } from 'src/domain/entities';

@Injectable()
export class NotificationUseCasesHelper {
  constructor() {}

  validateInput(notification: Notification): void {
    if (!notification) throw new NotFoundException('Notification Not Found');
  }

  checkAuthorization(notification: Notification, user: User) {
    if (notification?.receiver.id !== user.id)
      throw new UnauthorizedException('User Unauthorized');
  }


}
