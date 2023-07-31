import {
  BadRequestException,
  Body,
  Controller,
  Patch,
  Post,
  Req,
  UsePipes,
} from '@nestjs/common';

import { User } from 'src/domain/entities';
import {
  LoginUserDto,
  LoginUserResponseDto,
  RegisterUserDto,
  RegisterUserResponseDto,
  UpdateUserDto,
  UpdateUserCredentialsDto,
} from './dtos';
import { UserUseCases } from 'src/application/use-cases/user/user.use-cases';
import { ITokenService } from 'src/domain/abstracts';
import { CustomRequest } from 'src/presentation/common/types';
import { UpdateDtoValidationPipe } from 'src/presentation/common/pipes';

@Controller('user')
export class UserController {
  constructor(
    private readonly userUserCases: UserUseCases,
    private readonly tokenService: ITokenService,
  ) {}

  @Post('login')
  async loginUser(
    @Body() userDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    const userInput = new User(userDto);
    const user = await this.userUserCases.loginUser(userInput);
    const token = this.tokenService.generateToken(user);
  
    return new LoginUserResponseDto({ ...user, token });
  }

  @Post('sign-up')
  async registerUser(
    @Body() userDto: RegisterUserDto,
  ): Promise<RegisterUserResponseDto> {
    const user = new User(userDto);
    const registeredUser = await this.userUserCases.registerUser(user);
    const token = this.tokenService.generateToken(registeredUser);

    return new RegisterUserResponseDto({ ...registeredUser, token });
  }

  @UsePipes(new UpdateDtoValidationPipe(['name']))
  @Patch('update')
  async updateUser(@Req() req: CustomRequest, @Body() userDto: UpdateUserDto) {
    const inputUser = new User(userDto);
    const requestUser = new User(req.user);
    return this.userUserCases.updateUser(inputUser, requestUser);
  }

  @Patch('update/credentials')
  async updateUserCredentials(
    @Body() user: UpdateUserCredentialsDto,
  ): Promise<void> {
    return;
  }

  // @Post('find-by-ids')
  // findUsersByIds(@Body('users') users: User[]) {
  //   return this.userUserCases.getUsersByIds(users);
  // }

}
