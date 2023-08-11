import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Comment,
  Notification,
  Otp,
  Reminder,
  Task,
  Team,
  User,
} from '../entities';
import {
  UserRepository,
  NotificationRepository,
  TeamRepository,
  CommentRepository,
  ReminderRepository,
  TaskRepository,
} from './';
import { OtpRepository } from './otp.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Team,
      Task,
      Reminder,
      Notification,
      Comment,
      Otp,
    ]),
  ],
  providers: [
    UserRepository,
    TeamRepository,
    TaskRepository,
    CommentRepository,
    ReminderRepository,
    NotificationRepository,
    OtpRepository,
  ],
  exports: [
    UserRepository,
    TeamRepository,
    TaskRepository,
    CommentRepository,
    ReminderRepository,
    NotificationRepository,
    OtpRepository,
  ],
})
export class RepositoriesModule {}
