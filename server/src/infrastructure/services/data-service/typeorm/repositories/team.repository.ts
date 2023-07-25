import { Team } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ITeamRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamRepository implements ITeamRepository {
  constructor(@InjectRepository(Team) teamRepository: Repository<Team>) {}

  getById(id: string): Promise<Team> {
    return;
  }
  getAll(): Promise<Team[]> {
    return;
  }
  create(item: Team): Promise<Team> {
    return;
  }
  update(id: string, item: Team): Promise<Team> {
    return;
  }
  delete(id: string): void {}
}
