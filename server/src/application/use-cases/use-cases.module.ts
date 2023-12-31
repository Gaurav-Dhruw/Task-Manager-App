import { Global, Module } from '@nestjs/common';
import { UserUseCasesModule } from './user/user-use-cases.module';
import { TeamUseCasesModule } from './team/team-use-cases.module';
import { TaskUseCasesModule } from './task/task-use-cases.module';
import { CommentUseCasesModule } from './comment/comment-use-cases.module';
import { ReminderUseCasesModule } from './reminder/reminder-use-cases.module';
import { NotificationUseCasesModule } from './notification/notification-use-cases.module';
import { AuthUseCasesModule } from './auth/auth-use-cases.module';
import { OtpUseCasesModule } from './otp/otp-use-cases.module';

@Global()
@Module({
  imports: [
    OtpUseCasesModule,
    AuthUseCasesModule,
    UserUseCasesModule,
    TeamUseCasesModule,
    TaskUseCasesModule,
    CommentUseCasesModule,
    ReminderUseCasesModule,
    NotificationUseCasesModule,
  ],
  exports: [
    OtpUseCasesModule,
    AuthUseCasesModule,
    UserUseCasesModule,
    TeamUseCasesModule,
    TaskUseCasesModule,
    CommentUseCasesModule,
    ReminderUseCasesModule,
    NotificationUseCasesModule,
  ],
})
export class UseCasesModule {}
