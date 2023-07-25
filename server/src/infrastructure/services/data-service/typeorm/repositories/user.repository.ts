import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/domain/abstracts';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectRepository(User) userRepository: Repository<User>) {}

  getByEmail(email: string): Promise<User> {
    console.log('getByEmail Hit');
    return;
    // return new Promise(() => new User()).then(
    //   (res) => ({ id: '12324' } as User),
    // );
  }
  getById(id: string): Promise<User> {
    return;
  }
  getAll(): Promise<User[]> {
    return;
  }
  create(item: User): Promise<User> {
    return;
  }
  update(id: string, item: User): Promise<User> {
    return;
  }
}
