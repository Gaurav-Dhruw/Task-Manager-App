import {
  Body,
  Controller,
  Get,
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
  UpdateUserResponseDto,
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

  @Get('get-all')
  findAllUsers() {
    return this.userUserCases.getAllUsers();
  }

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
  @Patch()
  async updateUser(@Req() req: CustomRequest, @Body() userDto: UpdateUserDto) {
    const inputUser = new User(userDto);
    inputUser.id = req.user.id;

    const user = await this.userUserCases.updateUser(inputUser);

    return new UpdateUserResponseDto(user);
  }

  @Patch('update/credentials')
  async updateUserCredentials(
    @Body() user: UpdateUserCredentialsDto,
  ): Promise<void> {
    return;
  }


}
