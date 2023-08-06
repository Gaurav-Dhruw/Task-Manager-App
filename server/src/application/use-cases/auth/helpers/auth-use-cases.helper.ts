import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ITokenService } from 'src/domain/abstracts';
import { User } from 'src/domain/entities';

@Injectable()
export class AuthUseCasesHelper {
  constructor(private readonly tokenService: ITokenService) {}

  validateInput(user: User) {
    if (!user) throw new NotFoundException('User Not Found');
  }
  validateLoginOperation(user: User) {
    if (!user.is_verified) throw new ForbiddenException('User Not Verified');
  }

  checkAuthorization(user: User, requestUser: User) {
    if (user.id !== requestUser?.id)
      throw new UnauthorizedException('User Unauthorized');
  }

  validateCreateInput(user: User) {
    if (user) throw new BadRequestException('Email Already Registered');
  }

  generateVerificationUrl(data: { baseUrl: string; user: User }) {
    const { baseUrl, user } = data;
    const token = this.tokenService.generateToken(user, { minutes: 5 });
    const verification_url = `${baseUrl}/auth/verify/${token}`;
    return verification_url;
  }
}
