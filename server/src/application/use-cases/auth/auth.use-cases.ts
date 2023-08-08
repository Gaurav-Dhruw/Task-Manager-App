import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Notification } from 'src/domain/entities';
import {
  IHashService,
  ITokenService,
  INotificationService,
  IDataService,
  ITemplateEngine,
} from 'src/domain/abstracts';
import { User } from 'src/domain/entities';
import { ConfirmationTemplate, EmailTemplate, WelcomeTemplate } from 'src/domain/types';
import { NotificationUseCases } from '../notification/notification.use-cases';
import { AuthUseCasesHelper } from './helpers/auth-use-cases.helper';

@Injectable()
export class AuthUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly hashService: IHashService,
    private readonly helper: AuthUseCasesHelper,
    private readonly templateEngine: ITemplateEngine,
    private readonly tokenService: ITokenService,
    private readonly notificationService: INotificationService,
    private readonly notificationUseCases: NotificationUseCases,
  ) {}
  async loginUser(inputUser: User): Promise<User> {
    const user = await this.dataService.user.getByEmail(inputUser.email);

    this.helper.validateInput(user);
    this.helper.validateLoginOperation(user);

    if (!this.hashService.verify(inputUser.password, user.password))
      throw new UnauthorizedException('User Unauthorized');

    delete user.password;
    return user;
  }

  async registerUser(data: {
    inputUser: User;
    baseUrl: string;
  }): Promise<void> {
    const { inputUser, baseUrl } = data;
    let user = await this.dataService.user.getByEmail(inputUser.email);

    // Validtes if user exists or not.
    this.helper.validateCreateInput(user);

    inputUser.password = this.hashService.hash(inputUser.password);
    user = await this.dataService.user.create(inputUser);

    const verification_url = this.helper.generateVerificationUrl({
      baseUrl,
      user,
    });

    // Generating a html template string for email.
    const templateString = this.templateEngine.convert({
      template: 'confirmation',
      context: {
        username: user.name,
        verification_url,
      },
    } as ConfirmationTemplate);

    // Sending Verification mails.
    this.notificationService.email.sendMails([
      {
        subject: 'Email Verification',
        to: user.email,
        context: {
          content: templateString,
        },
      },
    ]);
  }

  async verifyUser(token: string): Promise<User> {
    const payload = this.tokenService.decodeToken(token);

    if (!payload || !payload.id)
      throw new UnauthorizedException('Invalid verification link');

    const { id: user_id } = payload;
    const user = await this.dataService.user.getById(user_id);

    if (user.is_verified)
      throw new BadRequestException('User Already Verified');

    user.is_verified = true;

    // Generating html template string for notificaions.
    const templateString = this.templateEngine.convert({
      template: 'welcome',
      context: {
        username: user.name,
      },
    } as WelcomeTemplate);

    const notification = new Notification({
      receiver: user,
      title: 'Welcome to Task-Manager',
      content: templateString,
      created_at: new Date(),
    });

    const emailOption:EmailTemplate = {
      subject:notification.title,
      to: notification.receiver?.email,
      context:{
        content: templateString,
      }
    }

    // Sending welcome mail, creating a welcome notification, and updating user status.
    const [_, __, verifiedUser] = await Promise.all([
      this.notificationService.email.sendMails([emailOption]),
      this.notificationUseCases.createNotification(notification),
      this.dataService.user.update(user_id, user),
    ]);
    return verifiedUser;
  }

  async generateVerificationLink(data: { inputUser: User; baseUrl: string }) {
    const { inputUser, baseUrl } = data;
    const user = await this.dataService.user.getByEmail(inputUser.email);

    this.helper.validateInput(user);

    if (!this.hashService.verify(inputUser.password, user.password)) {
      throw new UnauthorizedException('User Unauthoriazed');
    }
    // console.log(user);
    if (user.is_verified)
      throw new BadRequestException('User Already Verified');

    const verification_url = this.helper.generateVerificationUrl({
      baseUrl,
      user,
    });

    // Generating a html template string for email.
    const templateString = this.templateEngine.convert({
      template: 'confirmation',
      context: {
        username: user.name,
        verification_url,
      },
    } as ConfirmationTemplate);

    // Sending Verification mails.
    this.notificationService.email.sendMails([
      {
        subject: 'Email Verification',
        to: user.email,
        context: {
          content: templateString,
        },
      },
    ]);
  }
}
