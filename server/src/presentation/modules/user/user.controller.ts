import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';

import { Otp, User } from 'src/domain/entities';
import {
  UpdateUserDto,
  UpdateUserResponseDto,
  UpdateCredentialsDto,
  UpdateCredentialsResponseDto,
  SearchUsersDto,
} from './dtos';
import { UserUseCases } from 'src/application/use-cases/user/user.use-cases';
import { CustomRequest } from 'src/presentation/common/types';
import {
  RequestQueryPipe,
  UpdateDtoValidationPipe,
} from 'src/presentation/common/pipes';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  // @UsePipes(new QueryParameterPipe())
  @Get('list')
  findAllUsers(@Query(RequestQueryPipe) query: SearchUsersDto) {
    
    return this.userUseCases.getAllUsers(query);
  }

  @UsePipes(new UpdateDtoValidationPipe({ nonEmptyFields: ['name'] }))
  @Patch('update/profile')
  async updateUser(@Req() req: CustomRequest, @Body() userDto: UpdateUserDto) {
    const inputUser = new User(userDto);
    inputUser.id = req.user.id;

    const user = await this.userUseCases.updateUser(inputUser);

    return new UpdateUserResponseDto(user);
  }

  @UsePipes(
    new UpdateDtoValidationPipe({
      nonEmptyFields: ['new_email', 'password'],
      minSize: 3,
    }),
  )
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
