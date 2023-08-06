import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IDataService,
  IHashService,
  INotificationService,
  ITokenService,
} from 'src/domain/abstracts';
import { User, Notification } from 'src/domain/entities';
import { UserUseCasesHelper } from './helpers/user-use-cases.helper';
import { join } from 'path';
import { WelcomeTemplate } from 'src/domain/types';
import { NotificationUseCases } from '../notification/notification.use-cases';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly hashService: IHashService,
    private readonly helper: UserUseCasesHelper,
    private readonly tokenService: ITokenService,
    private readonly notificationService: INotificationService,
    private readonly notificationUseCases: NotificationUseCases,
  ) {}

  async loginUser(inputUser: User): Promise<User> {
    const user = await this.dataService.user.getByEmail(inputUser.email);

    this.helper.validateInput(user);

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

    this.helper.validateCreateInput(user);

    inputUser.password = this.hashService.hash(inputUser.password);
    user = await this.dataService.user.create(inputUser);

    const token = this.tokenService.generateToken(user);
    const verification_url = `${baseUrl}/user/verify/${token}`;
    console.log(verification_url);
    const templateString = this.notificationService.toTemplateString({
      template: 'confirmation',
      context: {
        username: user.name,
        verification_url,
      },
    });

    this.notificationService.email.sendMails([
      {
        subject: 'Email Verification',
        to: user.email,
        context: {
          title: 'Email Verification',
          content: templateString,
        },
      },
    ]);
  }

  async verifyUser(inputUser: User): Promise<User> {
    const { id: user_id } = inputUser;
    const user = await this.dataService.user.getById(user_id);
    user.is_verified = true;
    const templateString = this.notificationService.toTemplateString({
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

    const res = await Promise.all([
      this.notificationService.email.sendMails([
        {
          to: user.email,
          subject: 'Welcome to Task-Manager',
          context: {
            title: 'Welcome to Task-Manager',
            content: templateString,
          },
        },
      ]),
      this.notificationUseCases.createNotification(notification),
      this.dataService.user.update(user_id, user),
    ]);
    return res[2];
  }

  async updateUser(inputUser: User): Promise<User> {
    const user = await this.dataService.user.getById(inputUser.id);

    const updatedUser = { ...user, ...inputUser };

    return this.dataService.user.update(inputUser.id, updatedUser);
  }

  getUsersByIds(users: User[]): Promise<User[]> {
    const users_ids = users.map((user) => user.id);
    return this.dataService.user.getByIds(users_ids);
  }

  getAllUsers() {
    return this.dataService.user.getAll();
  }
}
