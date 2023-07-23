import { Module } from "@nestjs/common";
import { NotificationUseCases } from "./notification.use-cases";


@Module({
    providers:[NotificationUseCases],
    exports:[NotificationUseCases],
})
export class NotificationUseCasesModule{}