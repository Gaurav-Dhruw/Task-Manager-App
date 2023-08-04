
import { Notification } from 'src/domain/entities';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailNotificationService } from 'src/domain/abstracts';
import {google} from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailNotificationService implements IEmailNotificationService{
    constructor(private readonly mailerService: MailerService) {}
    
    async sendConfirmationMail(data: Notification): Promise<void> {
        await this.setTransport();
        this.mailerService.sendMail({
            transporterName:'gmail',
            to: data.receiver?.email,
            subject: "Email Confirmation",
            template:'confirmation',
        }).then(res=>{
            console.log("Confirmation Email Sent")
        }).catch(err=>{
            console.log(err);
        });
    }

    async sendWelcomeMail(data: Notification): Promise<void> {
        await this.setTransport();
        this.mailerService
          .sendMail({
            transporterName: 'gmail',
            to: data.receiver?.email,
            subject: 'Welcome',
            template: 'welcome',
          })
          .then((res) => {
            console.log('Confirmation Email Sent');
          })
          .catch((err) => {
            console.log(err);
          });
    }

    async sendReminderMail(data: Notification): Promise<void> {
        await this.setTransport();
        this.mailerService
          .sendMail({
            transporterName: 'gmail',
            to: data.receiver?.email,
            subject: 'Reminder',
            template: 'reminder',
            context:{
                
            }
          })
          .then((res) => {
            console.log('Reminder Email Sent');
          })
          .catch((err) => {
            console.log(err);
          });
    }

    private async setTransport():Promise<void>{
        const OAuth2Client = new google.auth.OAuth2({
          clientId: process.env.OAUTH2_CLIENT_ID,
          clientSecret: process.env.OAUTH2_CLIENT_SECRET,
          redirectUri: process.env.OAUTH2_REDIRECT_URI,
    
        });

        OAuth2Client.setCredentials({
            refresh_token: process.env.OAUTH2_REFRESH_TOKEN
        })

        const access_token = (await OAuth2Client.getAccessToken()).token;
        

        const config: Options = {
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_ID,
            clientId: process.env.OAUTH2_CLIENT_ID,
            clientSecret: process.env.OAUTH2_CLIENT_SECRET,
            accessToken: access_token
          },
        };

        this.mailerService.addTransporter('gmail',config);
    }
}