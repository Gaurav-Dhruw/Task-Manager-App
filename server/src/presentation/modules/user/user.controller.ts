import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UsePipes,
  Redirect,
  Param,
  BadGatewayException,
} from '@nestjs/common';

import { User } from 'src/domain/entities';
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
import { ReminderTemplate } from 'src/domain/types';

@Controller('user')
export class UserController {
  constructor(
    private readonly userUseCases: UserUseCases,
    private readonly tokenService: ITokenService,
    private readonly notificationService: INotificationService,
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

  @Redirect('', 302)
  @Post('sign-up')
  async registerUser(
    @Req() req: CustomRequest,
    @Body() userDto: RegisterUserDto,
  ): Promise<void> {
    const inputUser = new User(userDto);
    const baseUrl = req.protocol + '://' + req.get('host');
    console.log(baseUrl);
    const registeredUser = await this.userUseCases.registerUser({
      inputUser,
      baseUrl,
    });
  }

  @Get('verify/:token')
  async verfiyUser(
    @Param('token') token: string,
  ): Promise<RegisterUserResponseDto> {
    console.log('verify hit');
    const payload = this.tokenService.decodeToken(token);
    if (!payload || !payload.id) throw new BadGatewayException();
    const inputUser = new User(payload);
    const user = await this.userUseCases.verifyUser(inputUser);
    console.log(user);
    return new RegisterUserResponseDto(user);
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
