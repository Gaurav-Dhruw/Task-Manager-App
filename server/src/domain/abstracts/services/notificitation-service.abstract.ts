import { Notification } from "src/domain/entities";

export abstract class INotificationService {
    abstract sendEmail(data:Notification): Promise<void>
}