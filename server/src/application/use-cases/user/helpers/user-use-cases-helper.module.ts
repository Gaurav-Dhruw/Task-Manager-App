import { Module } from "@nestjs/common";
import { UserUseCasesHelper } from "./user-use-cases.helper";


@Module({
  providers: [UserUseCasesHelper],
  exports: [UserUseCasesHelper],
})
export class UserCasesHelperModule {}