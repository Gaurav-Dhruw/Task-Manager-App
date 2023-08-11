import { Body, Controller, Get, Patch, Req, UsePipes } from '@nestjs/common';

import { Otp, User } from 'src/domain/entities';
import {
  UpdateUserDto,
  UpdateUserResponseDto,
  UpdateCredentialsDto,
  UpdateCredentialsResponseDto,
} from './dtos';
import { UserUseCases } from 'src/application/use-cases/user/user.use-cases';
import { CustomRequest } from 'src/presentation/common/types';
import { UpdateDtoValidationPipe } from 'src/presentation/common/pipes';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  // @Get('get-all')
  // findAllUsers() {
  //   return this.userUseCases.getAllUsers();
  // }

  @UsePipes(new UpdateDtoValidationPipe(['name']))
  @Patch('update/profile')
  async updateUser(@Req() req: CustomRequest, @Body() userDto: UpdateUserDto) {
    const inputUser = new User(userDto);
    inputUser.id = req.user.id;

    const user = await this.userUseCases.updateUser(inputUser);

    return new UpdateUserResponseDto(user);
  }

  @UsePipes(new UpdateDtoValidationPipe(['new_email', 'password']))
  @Patch('update/credentials')
  async updateUserCredentials(
    @Body() dto: UpdateCredentialsDto,
  ): Promise<UpdateCredentialsResponseDto> {
    const otp = new Otp({
      code: dto.otp,
      email: dto.email,
    });

    const user = new User({
      email: dto.new_email,
      password: dto.password,
    });

    const updatedUser = await this.userUseCases.updateCredentials({
      curr_email: dto.email,
      user,
      otp,
    });
    return new UpdateCredentialsResponseDto(updatedUser);
  }
}
