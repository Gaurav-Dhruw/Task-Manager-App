import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UsePipes,
} from '@nestjs/common';

import { Notification, Reminder, Task, User } from 'src/domain/entities';
import {
  LoginUserDto,
  LoginUserResponseDto,
  RegisterUserDto,
  RegisterUserResponseDto,
  UpdateUserDto,
  UpdateUserCredentialsDto,
  UpdateUserResponseDto,
} from './dtos';
import { UserUseCases } from 'src/application/use-cases/user/user.use-cases';
import { INotificationService, ITokenService } from 'src/domain/abstracts';
import { CustomRequest } from 'src/presentation/common/types';
import { UpdateDtoValidationPipe } from 'src/presentation/common/pipes';
import { ReminderUseCases } from 'src/application/use-cases/reminder/reminder.use-cases';
import { ReminderTemplate } from 'src/domain/types';

@Controller('user')
export class UserController {
  constructor(
    private readonly userUseCases: UserUseCases,
    private readonly tokenService: ITokenService,
    private readonly notificationService: INotificationService,
    private readonly reminderUseCases: ReminderUseCases,
  ) {}

  @Get('get-all')
  findAllUsers() {
    return this.userUseCases.getAllUsers();
  }

  @Get('email-testing')
  sendReminderEmail() {
    // const notification = this.reminderUseCases.remindersToNotifications([
    //   new Reminder({
    //     receivers: [
    //       new User({ name: 'Test Name', email: 'raxstargd@gmail.com' }),
    //     ],
    //     scheduled_for: new Date(),
    //     task: new Task({ title: 'Test Task' }),
    //   }),
    // ])[0];
    // console.log('controller', notification);

    const templateString = this.notificationService.toTemplateString({
      title: 'Task Reminder',
      template: 'reminder',
      context: {
        username: 'Rax',
        task_name: 'Long Pending Task',
        reminder_schedule: new Date(),
      },
    } as ReminderTemplate);
    console.log(templateString);
    return this.notificationService.email.sendMails([
      {
        to: 'raxstargd@gmail.com',
        subject: 'Task Reminder',
        context: {
          title: 'Task Reminder',
          content: templateString,
        },
      },
    ]);
  }

  @Post('login')
  async loginUser(
    @Body() userDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    const userInput = new User(userDto);
    const user = await this.userUseCases.loginUser(userInput);
    const token = this.tokenService.generateToken(user);
    return new LoginUserResponseDto({ ...user, token });
  }

  @Post('sign-up')
  async registerUser(
    @Body() userDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    const user = new User(userDto);
    const registeredUser = await this.userUseCases.registerUser(user);
    const token = this.tokenService.generateToken(registeredUser);

    return new RegisterUserResponseDto({ ...registeredUser, token });
  }

  @UsePipes(new UpdateDtoValidationPipe(['name']))
  @Patch()
  async updateUser(@Req() req: CustomRequest, @Body() userDto: UpdateUserDto) {
    const inputUser = new User(userDto);
    inputUser.id = req.user.id;

    const user = await this.userUseCases.updateUser(inputUser);

    return new UpdateUserResponseDto(user);
  }

  @Patch('update/credentials')
  async updateUserCredentials(
    @Body() user: UpdateUserCredentialsDto,
  ): Promise<void> {
    return;
  }
}
