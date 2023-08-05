import { Injectable } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Notification, Reminder, User } from 'src/domain/entities';

@Injectable()
export class ReminderUseCases {
  constructor(private readonly dataService: IDataService) {}

  async deleteReminders(reminders: Reminder[]): Promise<void> {
    const ids: string[] = reminders.map((reminder) => reminder.id);
    await this.dataService.reminder.deleteMany(ids);
  }

  remindersToNotifications(reminders: Reminder[]) {
    const notifications: Notification[] = [];

    reminders.forEach((reminder) => {
      reminder.receivers.forEach((receiver) => {
        const notification = new Notification({
          receiver,
          created_at: new Date(),
        });

        notification.content = `
          <script>
        <h1>Task Reminder</h1>
  <p>Hello ${receiver.name},</p>
  <p>This is a reminder for your task <b>${reminder.task.title} </b> scheduled for <span class='timestamp'>${reminder.scheduled_for}</span>.</p>
  <p>Complete your task on time and stay productive!</p>
  `;
        notifications.push(notification);
      });
    });

    return notifications;
  }
}
