import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IDataService,
  IHashService,
  ITokenService,
} from 'src/domain/abstracts';
import { User } from 'src/domain/entities';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly tokenService: ITokenService,
    private readonly hashService: IHashService,
  ) {}

  async loginUser(userData: {
    email: string;
    password: string;
  }): Promise<User & { token: string }> {
    const user = await this.dataService.user.getByEmail(userData?.email);
    if (!user) throw new NotFoundException();
    else if (!this.hashService.verify(userData.password, user.password))
      throw new UnauthorizedException();

    const token = this.tokenService.generateToken(user);

    return { ...user, token };
  }

  async registerUser(userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<User & { token: string }> {
    const user = await this.dataService.user.getByEmail(userData?.email);
    console.log(user);
    if (!user) throw new BadRequestException();

    const token = this.tokenService.generateToken(user);

    return { ...user, token };
  }
}
