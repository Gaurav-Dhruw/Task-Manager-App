import { Body, Controller, Post } from '@nestjs/common';
import { GenerateOtpDto } from './dtos';
import { OtpUseCases } from 'src/application/use-cases/otp/otp.use-cases';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpUseCases: OtpUseCases) {}

  @Post('generate')
  async generateOtp(@Body() { email }: GenerateOtpDto) {
    await this.otpUseCases.generateOtp(email);
    return { message: 'OTP sent!' };
  }
}
