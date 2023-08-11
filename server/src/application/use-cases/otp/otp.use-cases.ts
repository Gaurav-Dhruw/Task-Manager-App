import { Injectable, NotFoundException } from '@nestjs/common';
import { IDataService, INotificationService } from 'src/domain/abstracts';
import { Otp } from 'src/domain/entities';
import { OtpUseCasesHelper } from './helpers/otp-use-cases.helper';
import { IOtpTemplate } from 'src/domain/types';

@Injectable()
export class OtpUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly notificationService: INotificationService,
    private readonly helper: OtpUseCasesHelper,
  ) {}

  async generateOtp(email: string): Promise<void> {
    const user = await this.dataService.user.getByEmail(email);
    if (!user) throw new NotFoundException('User Not Found');

    const expiration_time = new Date(new Date().getTime() + 5 * 60 * 1000);

    const code: string = this.helper.generateCode();

    const otp = new Otp({
      email,
      code,
      expiration_time,
    });

    const emailOption: IOtpTemplate = {
      subject: 'Requested OTP',
      to: email,
      template: 'otp',
      context: {
        username: user.name,
        code,
      },
    };

    await Promise.all([
      this.dataService.otp.create(otp),
      this.notificationService.email.sendMails([emailOption]),
    ]);
  }

  async verifyAndInvalidateOtp(inputOtp: Otp): Promise<boolean> {
    const { email, code } = inputOtp;
    const otp = await this.dataService.otp.get({ email, code });

    const is_verified: boolean =
      !!otp && new Date() < new Date(otp.expiration_time);

    if (otp) this.dataService.otp.delete(otp.id);

    return is_verified;
  }
}
