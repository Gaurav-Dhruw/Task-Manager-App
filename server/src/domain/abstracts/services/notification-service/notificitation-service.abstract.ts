import { IEmailNotificationService } from "./email-notification-service.abstract";
import { IAppNotificationService } from "./app-notification-service.abstract";

export abstract class INotificationService {
    email:IEmailNotificationService
    app:IAppNotificationService
}