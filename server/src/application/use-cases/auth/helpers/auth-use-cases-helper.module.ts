import { Module } from '@nestjs/common';
import { AuthUseCasesHelper } from './auth-use-cases.helper';

@Module({
  providers: [AuthUseCasesHelper],
  exports: [AuthUseCasesHelper],
})
export class AuthUseCasesHelperModule {}
