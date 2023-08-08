

import { Injectable } from '@nestjs/common';
import { ITemplateEngine } from 'src/domain/abstracts';
import { Reminder , Notification} from 'src/domain/entities';
import { ReminderTemplate, EmailTemplate } from 'src/domain/types';

@Injectable()
export class ReminderSchedulerHelper {

    constructor(private readonly templateEngine: ITemplateEngine){

    }
  remindersToNotifications(reminders: Reminder[]): Notification[] {
    const notifications: Notification[] = [];

    reminders.forEach((reminder) => {
      reminder.receivers?.forEach((receiver) => {
        const template: ReminderTemplate = {
          template: 'reminder',
          context: {
            username: receiver.name,
            task_name: reminder.task?.title,
            reminder_schedule: reminder.scheduled_for,
          },
        };
        const templateString = this.templateEngine.convert(template);

        const notification = new Notification({
          receiver,
          title: `Reminder for task  "${reminder.task?.title}"`,
          content: templateString,
          created_at: new Date(),
        });

        notifications.push(notification);
      });
    });

    return notifications;
  }

  notificationsToEmailOptions(notifications: Notification[]): EmailTemplate[] {
    const emailOptions: EmailTemplate[] = [];

    notifications.forEach((notification) => {
      const emailOption: EmailTemplate = {
        to: notification.receiver?.email,
        subject: notification.title,
        context: {
          content: notification.content,
        },
      };

      emailOptions.push(emailOption);
    });

    return emailOptions;
  }
}