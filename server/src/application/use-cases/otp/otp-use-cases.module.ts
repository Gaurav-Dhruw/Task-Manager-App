import { Module } from '@nestjs/common';
import { OtpUseCases } from './otp.use-cases';
import { OtpUseCasesHelperModule } from './helpers/otp-use-cases-helper.module';

@Module({
  imports: [OtpUseCasesHelperModule],
  providers: [OtpUseCases],
  exports: [OtpUseCases],
})
export class OtpUseCasesModule {}
