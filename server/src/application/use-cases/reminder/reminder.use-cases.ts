import { Injectable } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Reminder } from 'src/domain/entities';

@Injectable()
export class ReminderUseCases {
  constructor(private readonly dataService: IDataService) {}

  async deleteReminders(reminders: Reminder[]): Promise<void> {
    const ids: string[] = reminders.map((reminder) => reminder.id);
    await this.dataService.reminder.deleteMany(ids);
  }

  // getReminders() {
  //   const start = new Date();
  //   const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  //   return this.dataService.reminder.getAll({ between: { start, end } });
  // }
}
