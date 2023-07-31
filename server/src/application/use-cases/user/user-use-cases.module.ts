import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-cases';
import { UserCasesHelperModule } from './helpers/user-use-cases-helper.module';

@Module({
  imports:[UserCasesHelperModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
