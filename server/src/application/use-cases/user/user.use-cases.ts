import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IDataService, IHashService } from 'src/domain/abstracts';
import { Otp, User } from 'src/domain/entities';
import { OtpUseCases } from '../otp/otp.use-cases';
import { IRequestQuery } from 'src/domain/types/request-query.type';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly otpUseCases: OtpUseCases,
    private readonly hashService: IHashService,
  ) {}

  async updateUser(inputUser: User): Promise<User> {
    return this.dataService.user.update(inputUser.id, inputUser);
  }

  async updateCredentials(data: {
    curr_email: string;
    user: User;
    otp: Otp;
  }): Promise<User> {
    const { curr_email, user: inputUser, otp } = data;
    const { email: new_email } = inputUser;

    const [requestUser, user, otp_verified] = await Promise.all([
      this.dataService.user.getByEmail(curr_email),
      this.dataService.user.getByEmail(new_email),
      this.otpUseCases.verifyAndInvalidateOtp(otp),
    ]);

    if (!requestUser) throw new NotFoundException('User Not Found');
    else if (user)
      throw new BadRequestException('New Email Already Registered');
    else if (!otp_verified) throw new BadRequestException('Invalid OTP');

    if (inputUser.password) {
      inputUser.password = this.hashService.hash(inputUser.password);
    }

    const updatedUser = { ...user, ...inputUser };

    return this.dataService.user.update(inputUser.id, updatedUser);
  }

  getUsersByIds(users: User[]): Promise<User[]> {
    const users_ids = users.map((user) => user.id);
    return this.dataService.user.getByIds(users_ids);
  }

  getAllUsers(query?: IRequestQuery) {
    const { pagination, search = '' } = query || {};
    const { page = 1, limit = 10 } = pagination || {};

    return this.dataService.user.getAll({
      where: { is_verified: true, name: search, email: search },
      pagination: { page, limit },
    });
  }
}
