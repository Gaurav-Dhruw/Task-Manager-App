import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment, Notification, Reminder, Task, Team, User } from '../entities';
import {
  UserRepository,
  NotificationRepository,
  TeamRepository,
  CommentRepository,
  ReminderRepository,
  TaskRepository,
} from './';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Team,
      Task,
      Reminder,
      Notification,
      Comment,
    ]),
  ],
  providers: [
    UserRepository,
    TeamRepository,
    TaskRepository,
    CommentRepository,
    ReminderRepository,
    NotificationRepository,
  ],
  exports: [
    UserRepository,
    TeamRepository,
    TaskRepository,
    CommentRepository,
    ReminderRepository,
    NotificationRepository,
  ],
})
export class RepositoriesModule {}
