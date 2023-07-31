import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/domain/entities';

@Injectable()
export class UserUseCasesHelper {
  constructor() {}

  validateInput(user: User) {
    if (!user) throw new NotFoundException('User Not Found');
  }

  checkAuthorization(user: User, requestUser: User) {
    if (user.id !== requestUser?.id)
      throw new UnauthorizedException('User Unauthorized');
  }

  validateCreateInput(user: User) {
    if (user) throw new BadRequestException('Email Already Registered');
  }
}
