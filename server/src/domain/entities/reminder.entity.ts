import { Task, User } from "./";

export class Reminder {
    id: string;
    receivers: User[];
    task: Task;
    scheduled_for: Date;
}