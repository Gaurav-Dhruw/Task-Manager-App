import { User } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class IUserRepository implements IGenericRepository<User> {
  abstract getAll(): Promise<User[]>;
  abstract getById(id: string): Promise<User>;
  abstract create(item: User): Promise<User>;
  abstract update(id: string, item: User): Promise<User>;

  abstract getByEmail(email: string): Promise<User>;
}
