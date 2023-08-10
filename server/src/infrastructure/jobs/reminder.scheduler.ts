import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { NotificationUseCases } from 'src/application/use-cases/notification/notification.use-cases';
import { ReminderUseCases } from 'src/application/use-cases/reminder/reminder.use-cases';
import { INotificationService, IReminderScheduler } from 'src/domain/abstracts';
import { ReminderSchedulerHelper } from './helpers/reminder.scheduler.helper';
import { Reminder } from 'src/domain/entities';
import { CronJob, CronTime } from 'cron';

@Injectable()
export class ReminderScheduler implements IReminderScheduler {
  constructor(
    private readonly notificationService: INotificationService,
    private readonly reminderUseCases: ReminderUseCases,
    private readonly notificationUseCases: NotificationUseCases,
    private readonly helper: ReminderSchedulerHelper,
    private readonly schedulerRegistery: SchedulerRegistry,
  ) {}

  // Create a scheduled reminder.
  scheduleReminder(reminder: Reminder): void {
    const job = new CronJob(new Date(reminder.scheduled_for), () =>
      this.sendNotifications(reminder),
    );

    this.schedulerRegistery.addCronJob(reminder.id, job);
    job.start();

    // console.log(`job ${reminder.id} added for ${reminder.scheduled_for}`);
  }

  // Deletes the previos scheduled reminder and create a new one with new scheduled time.
  updateSchedule(reminder: Reminder): void {
    this.schedulerRegistery.deleteCronJob(reminder.id);

    const job = new CronJob(new Date(reminder.scheduled_for), () =>
      this.sendNotifications(reminder),
    );
    this.schedulerRegistery.addCronJob(reminder.id, job);
    job.start();

    // console.log(`job ${reminder.id} rescheduled for ${reminder.scheduled_for}`);
  }

  // Deletes a scheduled reminder 
  deleteScheduledReminder(reminder_id: string): void {
    this.schedulerRegistery.deleteCronJob(reminder_id);
    // console.log(`job ${reminder_id} removed`);
  }


  // Callback funtion to be used with scheduler
  async sendNotifications(reminder: Reminder): Promise<void> {
    // console.log(new Date());
    const notifications = this.helper.remindersToNotifications([reminder]);

    const emailOptions = this.helper.notificationsToEmailOptions(notifications);

    await Promise.all([
      this.notificationUseCases.createNotifications(notifications),
      this.notificationService.email.sendMails(emailOptions),
      this.notificationService.app.sendNotifications(notifications),
      this.reminderUseCases.deleteReminders([reminder]),
    ]);
  }
}
