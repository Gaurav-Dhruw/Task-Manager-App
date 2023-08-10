import { Team } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class ITeamRepository implements IGenericRepository<Team> {
  abstract getAll(options?:{user_id?: string, }): Promise<Team[]>;
  abstract getById(id: string): Promise<Team>;
  abstract create(item: Team): Promise<Team>;
  abstract update(id: string, item: Team): Promise<Team>;
  abstract delete(id: string): Promise<void>;
}
