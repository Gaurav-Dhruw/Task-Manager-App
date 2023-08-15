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

  getById(user_id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });
  }

  getByIds(user_ids: string[]): Promise<User[]> {
    return this.userRepository.find({
      where: { id: In(user_ids), is_verified: true },
    });
  }

  getAll(options?: {
    where?: { name?: string; email?: string; is_verified?: boolean };
    pagination?: { page: number; limit: number };
  }): Promise<User[]> {
    const { where, pagination } = options || {};

    const { name, email, is_verified } = where || {};
    const { page = 1, limit = 10 } = pagination || {};

    const queryOptions = {
      where: [
        {
          name: { name: ILike(`%${name}%`) },
          is_verified: { is_verified },
        },
        {
          email: { email: ILike(`%${email}%`) },
          is_verified: { is_verified },
        },
      ],
      pagination: {
        take: limit,
        skip: (page - 1) * limit,
      },
    };

    const query = this.helper.buildQuery(options, queryOptions);
    // console.log(query);

    return this.userRepository.find({
      ...query,
    });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  update(user_id: string, user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
