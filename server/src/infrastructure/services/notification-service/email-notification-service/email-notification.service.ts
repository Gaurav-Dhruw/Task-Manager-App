

import { Injectable } from '@nestjs/common';
import { IEmailNotificationService } from 'src/domain/abstracts';

@Injectable()
export class EmailNotificationService implements IEmailNotificationService{
    constructor() {}
    
    sendConfirmationMail(data: Notification): Promise<void> {
        return;
    }

    sendWelcomeMail(data: Notification): Promise<void> {
        return;
    }

    sendReminderMail(data: Notification): void {
        
    }
}