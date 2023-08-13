import { Team } from 'src/domain/entities';
import { IGenericRepository } from '.';

export abstract class ITeamRepository implements IGenericRepository<Team> {
  abstract getAll(options?: {
    where?: { user_id?: string, team_name?:string },
    sort?:{
      team_name?:'desc'| 'asc'
    }
    pagination?:{page:number, limit:number}
  }): Promise<Team[]>;
  abstract getById(team_id: string): Promise<Team>;
  abstract create(team: Team): Promise<Team>;
  abstract update(team_id: string, team: Team): Promise<Team>;
  abstract delete(team_id: string): Promise<void>;
}
