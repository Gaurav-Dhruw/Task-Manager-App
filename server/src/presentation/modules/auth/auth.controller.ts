import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {
  GenerateVerificationLinkDto,
  LoginUserDto,
  LoginUserResponseDto,
  RegisterUserDto,
  VerifyUserResponseDto,
} from './dtos';
import { Otp, User } from 'src/domain/entities';
import { CustomRequest } from 'src/presentation/common/types';
import { ITokenService } from 'src/domain/abstracts';
import { AuthUseCases } from 'src/application/use-cases/auth/auth.use-cases';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly authUseCases: AuthUseCases,
  ) {}

  @Post('login')
  async loginUser(
    @Body() userDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    const userInput = new User(userDto);
    const user = await this.authUseCases.loginUser(userInput);
    const token = this.tokenService.generateToken(user);

    return new LoginUserResponseDto({ ...user, token });
  }

  @Post('sign-up')
  async registerUser(
    @Req() req: CustomRequest,
    @Body() userDto: RegisterUserDto,
  ) {
    const inputUser = new User(userDto);
    const baseUrl = req.protocol + '://' + req.get('host');

    await this.authUseCases.registerUser({
      inputUser,
      baseUrl,
    });

    return { message: 'verification link sent to the registered email' };
  }

  @Get('verify/:token')
  async verfiyUser(
    @Param('token') token: string,
  ): Promise<VerifyUserResponseDto> {
    const user = await this.authUseCases.verifyUser(token);
    const newToken = this.tokenService.generateToken(user, { hours: 2 });

    return new VerifyUserResponseDto({ ...user, token: newToken });
  }

  @Post('verification-link')
  async generateVerificationLink(
    @Req() req: CustomRequest,
    @Body() dto: GenerateVerificationLinkDto,
  ) {
    const otp = new Otp({
      email: dto.email,
      code: dto.otp,
    });

    const baseUrl = req.protocol + '://' + req.get('host');

    await this.authUseCases.generateVerificationLink({ otp, baseUrl });
    return { message: 'verfication link sent!' };
  }
}
