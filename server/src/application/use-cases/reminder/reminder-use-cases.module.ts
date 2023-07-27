import { Module } from "@nestjs/common";
import { ReminderUseCases } from "./reminder.use-cases";

@Module({
    imports:[],
    providers:[ReminderUseCases],
    exports:[ReminderUseCases],
})
export class ReminderUseCasesModule{}