import { Module } from "@nestjs/common";
import { UserUseCases } from "./user.use-cases";


@Module({
    imports:[],
    providers:[UserUseCases],
    exports:[UserUseCases],
})
export class UserUseCasesModule{}