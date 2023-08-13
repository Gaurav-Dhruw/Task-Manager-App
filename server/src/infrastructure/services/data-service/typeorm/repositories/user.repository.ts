import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Injectable } from '@nestjs/common';
import { ILike, In, Repository } from 'typeorm';
import { IUserRepository } from 'src/domain/abstracts';
import { RepositoryHelper } from './repository.helper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly helper: RepositoryHelper,
  ) {}

  getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        is_verified: true,
        profile_pic: true,
      },
      relations: ['tasks', 'teams'],
    });
  }

  getById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  getByIds(ids: string[]): Promise<User[]> {
    return this.userRepository.find({
      where: { id: In(ids), is_verified: true },
    });
  }

  getAll(options?: {
    where?: { name?: string; email?: string };
    pagination?: { page: number; limit: number };
  }): Promise<User[]> {
    const { where, pagination } = options || {};

    const { name, email } = where || {};
    const { page=1, limit=10 } = pagination || {};

    const queryOptions = {
      where: {
        name: { name: ILike(`%${name}%`) },
        email: { email: ILike(`%${email}%`) },
      },
      pagination: {
        take: limit,
        skip: (page - 1) * limit,
      },
    };

    const query = this.helper.buildQuery(options, queryOptions);
    return this.userRepository.find({
      where: { is_verified: true },
      relations: ['tasks', 'teams'],
    });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  update(id: string, user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
