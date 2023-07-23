import { User } from "./";


export class Notification{
    id: string;
    receiver: User;
    content: string;
    is_read: boolean;
}