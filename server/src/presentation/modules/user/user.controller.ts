import { Body, Controller, Get, Patch, Req, UsePipes } from '@nestjs/common';

import { User } from 'src/domain/entities';
import {
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
