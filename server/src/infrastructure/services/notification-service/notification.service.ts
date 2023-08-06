import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';
import { join } from 'path';
import {
  IAppNotificationService,
  IEmailNotificationService,
  INotificationService,
} from 'src/domain/abstracts';
import { Notification, Reminder } from 'src/domain/entities';
import {
  EmailTemplate,
  NotificationTemplate,
  ReminderTemplate,
} from 'src/domain/types';

@Injectable()
export class NotificationService implements INotificationService {
  handlebars: typeof handlebars;
  constructor(
    readonly email: IEmailNotificationService,
    readonly app: IAppNotificationService,
  ) {
    this.handlebars = handlebars;
  }

  toTemplateString(data: NotificationTemplate): string {
    const filePath = join(
      __dirname,
      'notification-templates',
      data.template + '.hbs',
    );
    const templateSource = readFileSync(filePath).toString();

    const template = this.handlebars.compile(templateSource);

    const renderedTemplate = template(data.context);

    return renderedTemplate;
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
        const templateString = this.toTemplateString(template);

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
          title: notification.title,
          content: notification.content,
        },
      };

      emailOptions.push(emailOption);
    });

    return emailOptions;
  }
}
