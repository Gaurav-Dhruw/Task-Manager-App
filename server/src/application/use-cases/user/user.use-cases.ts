import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IDataService, IHashService } from 'src/domain/abstracts';
import { User } from 'src/domain/entities';
import { UserUseCasesHelper } from './helpers/user-use-cases.helper';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly hashService: IHashService,
    private readonly helper: UserUseCasesHelper,
  ) {}

  async loginUser(inputUser: User): Promise<User> {
    const user = await this.dataService.user.getByEmail(inputUser.email);

    this.helper.validateInput(user);

    if (!this.hashService.verify(inputUser.password, user.password))
      throw new UnauthorizedException('User Unauthorized');

    return user;
  }

  async registerUser(inputUser: User): Promise<User> {
    const user = await this.dataService.user.getByEmail(inputUser.email);

    this.helper.validateCreateInput(user);

    inputUser.password = this.hashService.hash(inputUser.password);
    return this.dataService.user.create(inputUser);
  }

  async updateUser(inputUser: User, requestUser: User): Promise<User> {
    const user = await this.dataService.user.getById(inputUser?.id);

    this.helper.validateInput(user);
    this.helper.checkAuthorization(user, requestUser);

    const updatedUser = { ...user, ...inputUser };
    return this.dataService.user.update(inputUser.id, updatedUser);
  }

  getUsersByIds(users: User[]): Promise<User[]> {
    const users_ids = users.map((user) => user.id);
    return this.dataService.user.getByIds(users_ids);
  }
}
