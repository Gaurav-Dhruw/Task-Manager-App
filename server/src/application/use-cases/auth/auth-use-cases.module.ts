import { Module } from '@nestjs/common';
import { AuthUseCases } from './auth.use-cases';
import { AuthUseCasesHelperModule } from './helpers/auth-use-cases-helper.module';

@Module({
  imports: [AuthUseCasesHelperModule],
  providers: [AuthUseCases],
  exports: [AuthUseCases],
})
export class AuthUseCasesModule {}
