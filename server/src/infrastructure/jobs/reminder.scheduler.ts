import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { NotificationUseCases } from 'src/application/use-cases/notification/notification.use-cases';
import { ReminderUseCases } from 'src/application/use-cases/reminder/reminder.use-cases';
import { INotificationService } from 'src/domain/abstracts';

@Injectable()
export class ReminderScheduler {
  constructor(
    private readonly notificationService: INotificationService,
    private readonly reminderUseCases: ReminderUseCases,
    private readonly notificationUseCases: NotificationUseCases,
  ) {}

  @Interval(10000)
  async scheduleReminder(): Promise<void> {
    console.log(new Date().getSeconds());
    const reminders = await this.reminderUseCases.getReminders();
    const notifications =
      this.notificationService.remindersToNotifications(reminders);
    const emailOptions =
      this.notificationService.notificationsToEmailOptions(notifications);

    if (emailOptions.length)
      this.notificationService.email.sendMails(emailOptions);
    if (reminders.length)
      await this.reminderUseCases.deleteReminders(reminders);
  }
}
