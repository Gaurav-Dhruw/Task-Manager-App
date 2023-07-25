import {
  Body,
  Controller,
  Inject,
  NotFoundException,
  Post,
} from '@nestjs/common';

import { User } from 'src/domain/entities';
import {
  LoginUserDto,
  LoginUserResponseDto,
  RegisterUserDto,
  RegisterUserResponseDto,
} from './dtos';
import { UserUseCases } from 'src/application/use-cases/user/user.use-cases';

@Controller('user')
export class UserController {
  constructor(
     private readonly userUserCases: UserUseCases,
  ) {}

  @Post('login')
  async loginUser(
    @Body() userDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    const user = await this.userUserCases.loginUser(userDto);

    return new LoginUserResponseDto(user);
  }

  @Post('sign-up')
  async registerUser(
    @Body() userDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    const user = await this.userUserCases.registerUser(userDto);
    console.log('sign-up hit', user);
    return new RegisterUserResponseDto(user);
  }
}
