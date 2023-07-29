import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Notification, User } from 'src/domain/entities';

@Injectable()
export class NotificationUseCasesHelper {
  constructor() {}

  validateOperation(notification: Notification, requestedUser: User): void {
    if (!notification) throw new NotFoundException('Notification Not Found');
    else if (notification.receiver.id !== requestedUser.id)
      throw new UnauthorizedException('User Unauthorized');
  }

  checkAuthorization(requestedUser:User){
        if(!requestedUser) throw new UnauthorizedException('User Unauthorized');
  }

  
  
}
