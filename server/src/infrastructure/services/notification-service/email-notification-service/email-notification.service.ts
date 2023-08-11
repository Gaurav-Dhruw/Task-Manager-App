import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailNotificationService } from 'src/domain/abstracts';
import { IGenericEmailTemplate } from 'src/domain/types';

@Injectable()
export class EmailNotificationService implements IEmailNotificationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMails(emailOptions: IGenericEmailTemplate[]): Promise<void> {
    Promise.all(
      emailOptions.map((option) => {
        const { to, subject, context, template } = option;

        return this.mailerService.sendMail({
          to,
          subject,
          template,
          context,
        });
      }),
    )
      .then((res) => {
        // console.log('Emails Sent');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
