import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  NotFoundException,
  Patch,
  Post,
  Req,
} from '@nestjs/common';

import { User } from 'src/domain/entities';
import {
  LoginUserDto,
  LoginUserResponseDto,
  RegisterUserDto,
  RegisterUserResponseDto,
} from './dtos';
import { UserUseCases } from 'src/application/use-cases/user/user.use-cases';
import {
  UpdateUserCredentialsDto,
  UpdateUserDto,
} from './dtos/update-user.dto';
import { ITokenService } from 'src/domain/abstracts';
import { CustomRequest } from 'src/presentation/common/types';

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
    const user = new User(userDto);
    const userDetails = await this.userUserCases.loginUser(user);
    const token = this.tokenService.generateToken(userDetails);
    console.log(userDetails);
    return new LoginUserResponseDto({ ...userDetails, token });
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

  @Patch('update')
  async updateUser(@Req() req: CustomRequest, @Body() userDto: UpdateUserDto) {
    if (this.isEmptyObject(userDto) || this.hasNullValues(userDto))
      throw new BadRequestException();

    const user = new User({ ...req.user, ...userDto });
    return this.userUserCases.updateUser(user);
  }

  @Patch('update/credentials')
  async updateUserCredentials(
    @Body() user: UpdateUserCredentialsDto,
  ): Promise<void> {
    return;
  }

  isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }

  hasNullValues(obj: object): boolean {
    for (const key in obj) {
      if (obj[key] === null) return true;
    }
    return false;
  }
}
