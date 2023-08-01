import { IsNotEmpty, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { Task } from 'src/domain/entities';
import { Priority, Status } from 'src/domain/types';
import { CreatePersonalTaskDto } from './create-personal-task.dto';
import {  PartialType } from '@nestjs/mapped-types';

export class UpdatePersonalTaskDto extends PartialType(CreatePersonalTaskDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}

export class UpdatePersonalTaskResponseDto {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: Status;
  priority: Priority;

  constructor(options?: Partial<Task>) {
    this.id = options?.id ?? this.id;
    this.title = options?.title ?? this.title;
    this.description = options?.description ? options.description : null;
    this.deadline = options?.deadline ? options.deadline : null;
    this.status = options?.status ?? this.status;
    this.priority = options?.priority ? options.priority : null;
  }
}
