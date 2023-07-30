import { Module } from "@nestjs/common";
import { UserUseCases } from "./user.use-cases";
import { UserCasesHelper } from "./user-use-cases.helper";


@Module({
    providers:[UserUseCases, UserCasesHelper],
    exports:[UserUseCases],
})
export class UserUseCasesModule{}