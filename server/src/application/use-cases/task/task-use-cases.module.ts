import { Module } from "@nestjs/common";
import { TaskUseCases } from "./task.use-cases";
import { TaskUseCasesHelper } from "./task-use-cases.helper";


@Module({
  
    providers:[TaskUseCases, TaskUseCasesHelper],
    exports:[TaskUseCases]
})
export class TaskUseCasesModule{}