import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Reminder, User } from 'src/domain/entities';

@Injectable()
export class ReminderUseCasesHelper {
    constructor() {}
    
    validateOperation(reminder:Reminder, requestedUser:User):void{
     if (!reminder)
          throw new NotFoundException('Reminder Not Found');
    else if(reminder.created_by.id !== requestedUser?.id)
        throw new UnauthorizedException("User Unauthorized");
    }
}