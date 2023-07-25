import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDataService } from 'src/domain/abstracts';
import { TypeOrmDataService } from './typeorm-data-service.service';
import { Comment, Notification, Reminder, Task, Team, User } from './entities';
import { UserRepository } from './repositories/user.repository';
import { TeamRepository } from './repositories/team.repository';
import { TaskRepository } from './repositories/task.repository';
import { CommentRepository } from './repositories/comment.repository';
import { ReminderRepository } from './repositories/reminder.repository';
import { NotificationRepository } from './repositories/notification.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',

        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [User, Team, Task, Reminder, Notification, Comment],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      Team,
      Task,
      Reminder,
      Notification,
      Comment,
    ]),
  ],
  providers: [UserRepository, TeamRepository, TaskRepository, CommentRepository, ReminderRepository, NotificationRepository,
    {
      provide: IDataService,
      useClass: TypeOrmDataService,
    },
  ],
  exports: [IDataService],
})
export class TypeOrmDataServiceModule {
  constructor() {
    // console.log(process.env);
  }
}
