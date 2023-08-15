import { Module } from "@nestjs/common";
import { OtpUseCasesHelper } from "./otp-use-cases.helper";


@Module({
  providers: [OtpUseCasesHelper],
  exports: [OtpUseCasesHelper],
})
export class OtpUseCasesHelperModule {}