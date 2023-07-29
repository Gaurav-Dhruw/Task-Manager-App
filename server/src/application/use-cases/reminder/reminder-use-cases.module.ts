import { Module } from "@nestjs/common";
import { ReminderUseCases } from "./reminder.use-cases";
import { ReminderUseCasesHelper } from "./reminder-use-cases.helper";

@Module({
    imports:[],
    providers:[ReminderUseCases, ReminderUseCasesHelper],
    exports:[ReminderUseCases],
})
export class ReminderUseCasesModule{}