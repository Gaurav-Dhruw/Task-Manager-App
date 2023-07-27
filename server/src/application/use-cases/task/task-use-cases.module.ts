import { Module } from "@nestjs/common";
import { TaskUseCases } from "./task.use-cases";


@Module({
    imports:[],
    providers:[TaskUseCases],
    exports:[TaskUseCases]
})
export class TaskUseCasesModule{}