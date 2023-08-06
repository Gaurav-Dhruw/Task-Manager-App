import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailNotificationService } from 'src/domain/abstracts';
import { EmailTemplate } from 'src/domain/types';

@Injectable()
export class EmailNotificationService implements IEmailNotificationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMails(emailOptions: EmailTemplate[]): Promise<void> {
    Promise.all(
      emailOptions.map((option) => {
        const {
          to,
          subject,
          context: { content , title},
        } = option || {};

        return this.mailerService.sendMail({
          to,
          subject,
          template: 'email-template',
          context: {
            title,
            content,
          },
        });
      }),
    )
      .then((res) => {
        console.log('Emails Sent');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
