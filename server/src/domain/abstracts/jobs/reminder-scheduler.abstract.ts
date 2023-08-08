import { Reminder } from 'src/domain/entities';

export abstract class IReminderScheduler {
  abstract scheduleReminder(reminder: Reminder): void;
  abstract updateSchedule(reminder: Reminder): void;
  abstract deleteScheduledReminder(reminder_id: string): void;
}
