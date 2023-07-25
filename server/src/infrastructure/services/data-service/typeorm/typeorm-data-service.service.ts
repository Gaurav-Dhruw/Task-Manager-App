import { Injectable } from "@nestjs/common";
import { IDataService } from "src/domain/abstracts";
import { UserRepository } from "./repositories/user.repository";
import { TaskRepository } from "./repositories/task.repository";
import { CommentRepository } from "./repositories/comment.repository";
import { NotificationRepository } from "./repositories/notification.repository";
import { ReminderRepository } from "./repositories/reminder.repository";
import { TeamRepository } from "./repositories/team.repository";

@Injectable()
export class TypeOrmDataService implements IDataService{
    constructor(
         readonly user: UserRepository,
         readonly team: TeamRepository,
         readonly task: TaskRepository,
         readonly comment: CommentRepository,
         readonly reminder: ReminderRepository,
         readonly notification: NotificationRepository,
    ){}
}