import { OmitType } from '@nestjs/mapped-types';
import { Task } from 'src/domain/entities';

export class GetPersonalTaskResponseDto extends OmitType(Task, [
  'comments',
  'team',
]) {
  constructor(options?: Partial<Task>) {
    super();

    this.id = options?.id ?? this.id;
    this.title = options?.title ?? this.title;
    this.description = options?.description ? options.description : null;
    this.deadline = options?.deadline ? options.deadline : null;
    this.status = options?.status ?? this.status;
    this.priority = options?.priority ? options.priority : null;
    this.reminders = options?.reminders ?? this.reminders;
  }
}
