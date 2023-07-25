import { Global, Module } from '@nestjs/common';
import { UserUseCasesModule } from './user/user-use-cases.module';
import { TeamUseCasesModule } from './team/team-use-cases.module';
import { TaskUseCasesModule } from './task/task-use-cases.module';
import { CommentUseCasesModule } from './comment/comment-use-cases.module';
import { ReminderUseCasesModule } from './reminder/reminder-use-cases.module';
import { NotificationUseCasesModule } from './notification/notification-use-cases.module';

@Global()
@Module({
  imports: [
    UserUseCasesModule,
    TeamUseCasesModule,
    TaskUseCasesModule,
    CommentUseCasesModule,
    ReminderUseCasesModule,
    NotificationUseCasesModule,
  ],
  exports: [
    UserUseCasesModule,
    TeamUseCasesModule,
    TaskUseCasesModule,
    CommentUseCasesModule,
    ReminderUseCasesModule,
    NotificationUseCasesModule,
  ],
})
export class UseCasesModule {}
