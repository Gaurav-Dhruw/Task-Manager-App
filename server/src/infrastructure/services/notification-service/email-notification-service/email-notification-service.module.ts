import { Module } from '@nestjs/common';
import {MailerModule} from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { IEmailNotificationService } from 'src/domain/abstracts';
import { EmailNotificationService } from './email-notification.service';
import { join } from 'path';

@Module({
  imports: [MailerModule.forRootAsync({
    useFactory:()=>({
        defaults:{
            from:`'No Reply' ${process.env.EMAIL_ID}`
        },
        template:{
            dir:join(__dirname,'templates'),
            adapter: new HandlebarsAdapter(),
            options:{
                strict:true
            }
        }
    })
  })],
  providers: [
    {
      provide: IEmailNotificationService,
      useClass: EmailNotificationService,
    },
  ],
  exports: [IEmailNotificationService],
})
export class EmailNotificationServiceModule {}
