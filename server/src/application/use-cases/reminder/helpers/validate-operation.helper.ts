import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { Reminder, Task } from "src/domain/entities";

@Injectable()
export class ValidateOperationHelper {
  validateReminder(reminder: Reminder) {
    if (!reminder) throw new NotFoundException('Reminder Not Found');
  }

  validateSchedule(schedule: Date) {
    if (new Date(schedule) <= new Date())
      throw new BadRequestException('Past Scheduling Time');
  }

  validateTask(task: Task) {
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
  }
}
