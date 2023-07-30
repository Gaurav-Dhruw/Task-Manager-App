import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IDataService, IHashService } from 'src/domain/abstracts';
import { User } from 'src/domain/entities';
import { UserCasesHelper } from './user-use-cases.helper';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly hashService: IHashService,
    private readonly helper: UserCasesHelper
  ) {}

  async loginUser(inputUser: User): Promise<User> {
    const user = await this.dataService.user.getByEmail(inputUser.email);
    if (!user) throw new NotFoundException('User Not Found');
    else if (!this.hashService.verify(inputUser.password, user.password))
      throw new UnauthorizedException();

    return user;
  }

  async registerUser(inputUser: User): Promise<User> {
    const user = await this.dataService.user.getByEmail(inputUser.email);
    if (user) throw new BadRequestException('Email Already Registered');

    inputUser.password = this.hashService.hash(inputUser.password);
    return this.dataService.user.create(inputUser);
  }

  async updateUser(inputUser: User, requestUser:User): Promise<User> {
    const user = await this.dataService.user.getById(inputUser?.id);
    this.helper.validateMutateOperation(user, requestUser);
    return this.dataService.user.update(inputUser.id, inputUser);
  }

  getUsersByIds(users: User[]): Promise<User[]> {
    const users_ids = users.map((user)=> user.id);
    return this.dataService.user.getByIds(users_ids);
  }
}
