import { Injectable } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { User } from 'src/domain/entities';

@Injectable()
export class UserUseCases {
  constructor(private readonly dataService: IDataService) {}

  async updateUser(inputUser: User): Promise<User> {
    const user = await this.dataService.user.getById(inputUser.id);

    const updatedUser = { ...user, ...inputUser };

    return this.dataService.user.update(inputUser.id, updatedUser);
  }

  getUsersByIds(users: User[]): Promise<User[]> {
    const users_ids = users.map((user) => user.id);
    return this.dataService.user.getByIds(users_ids);
  }

  getAllUsers() {
    return this.dataService.user.getAll();
  }
}
