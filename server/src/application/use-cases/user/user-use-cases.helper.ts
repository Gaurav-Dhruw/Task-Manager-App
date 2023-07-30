import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/domain/entities';

@Injectable()
export class UserCasesHelper {
  validateMutateOperation(user: User, requestUser: User) {
    if (!user) throw new NotFoundException('User Not Found');
    else if (user.id !== requestUser?.id)
      throw new UnauthorizedException('User Unauthorized');
  }
}
