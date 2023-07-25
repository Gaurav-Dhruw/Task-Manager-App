import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { TeamModule } from "./team/team.module";
import { TaskModule } from "./task/task.module";
import { CommentModule } from "./comment/comment.module";
import { ReminderModule } from "./reminder/reminder.module";
import { NotificationModule } from "./notification/notification.module";


@Module({
    imports:[UserModule, TeamModule, TaskModule, CommentModule, ReminderModule, NotificationModule],
    exports:[UserModule, TeamModule, TaskModule, CommentModule, ReminderModule, NotificationModule]
})
export class ControllersModule{}