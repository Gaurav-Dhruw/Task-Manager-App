import { User } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class IUserRepository implements IGenericRepository<User> {
  abstract getAll(options?: {
    where?: {
      name?: string;
      email?: string;
    };
    pagination?: { page: number; limit: number };
  }): Promise<User[]>;

  abstract getById(user_id: string): Promise<User>;
  abstract getByIds(user_ids: string[]): Promise<User[]>;

  abstract create(user: User): Promise<User>;
  abstract update(user_id: string, user: User): Promise<User>;

  abstract getByEmail(email: string): Promise<User>;
}
