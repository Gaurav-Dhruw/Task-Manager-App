import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { IUserRepository } from 'src/domain/abstracts';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['teams'],
    });
  }
  getById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  getByIds(ids: string[]): Promise<User[]> {
    return this.userRepository.find({
      where: { id: In(ids) },
    });
  }
  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  update(id: string, user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
