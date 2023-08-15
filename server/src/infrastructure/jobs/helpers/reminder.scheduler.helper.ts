

import { Injectable } from '@nestjs/common';
import { ITemplateEngine } from 'src/domain/abstracts';
import { Reminder , Notification} from 'src/domain/entities';
import { IReminderTemplate, IEmailTemplate } from 'src/domain/types';

@Injectable()
export class ReminderSchedulerHelper {

    constructor(private readonly templateEngine: ITemplateEngine){

    }
  remindersToNotifications(reminders: Reminder[]): Notification[] {
    const notifications: Notification[] = [];

    reminders.forEach((reminder) => {
      reminder.receivers?.forEach((receiver) => {
        const template: IReminderTemplate = {
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

  notificationsToEmailOptions(notifications: Notification[]): IEmailTemplate[] {
    const emailOptions: IEmailTemplate[] = [];

    notifications.forEach((notification) => {
      const emailOption: IEmailTemplate = {
        to: notification.receiver?.email,
        subject: notification.title,
        template:'email-cover',
        context: {
          content: notification.content,
        },
      };

      emailOptions.push(emailOption);
    });

    return emailOptions;
  }
}