import { IsNotEmpty, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { Task } from 'src/domain/entities';
import { Priority, Status } from 'src/domain/types';
import { CreateTaskDto } from './create-task.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}

export class UpdateTaskResponseDto extends OmitType(Task, [
  'comments',
  'team',
  'reminders',
]) {
  constructor(options?: Partial<Task>) {
    super();

    this.id = options?.id ?? this.id;
    this.title = options?.title ?? this.title;
    this.description = options?.description ? options.description : null;
    this.deadline = options?.deadline ? options.deadline : null;
    this.status = options?.status ?? this.status;
    this.priority = options?.priority ? options.priority : null;
  }
}
