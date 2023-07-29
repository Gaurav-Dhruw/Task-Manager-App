import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IDataService, IHashService } from 'src/domain/abstracts';
import { User } from 'src/domain/entities';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly dataService: IDataService,
    private readonly hashService: IHashService,
  ) {}

  async loginUser(inputUser: User): Promise<User> {
    const user = await this.dataService.user.getByEmail(inputUser.email);
    if (!user) throw new NotFoundException('User Not Found');
    else if (!this.hashService.verify(inputUser.password, user.password))
      throw new UnauthorizedException();

    return user;
  }

  async registerUser(inputUser: User): Promise<User> {
    const isAlreadyRegistered =
      (await this.dataService.user.getByEmail(inputUser.email)) !== null;
    if (isAlreadyRegistered)
      throw new BadRequestException('Email Already Registered');

    inputUser.password = this.hashService.hash(inputUser.password);
    const registeredUser = await this.dataService.user.create(inputUser);
    console.log(registeredUser);
    return registeredUser;
  }

  async updateUser(inputUser: User): Promise<User> {
    console.log('Update User Hit');
    return this.dataService.user.update(inputUser.id, inputUser);
  }

  getUsersByIds(usersInput: string[]): Promise<User[]> {
    return this.dataService.user.getByIds(usersInput);
  }
}
