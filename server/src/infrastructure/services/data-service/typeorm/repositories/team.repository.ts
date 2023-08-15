import { Team } from '../entities';
import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { ITeamRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryHelper } from './repository.helper';

@Injectable()
export class TeamRepository implements ITeamRepository {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    private readonly helper: RepositoryHelper,
  ) {}

  getById(id: string): Promise<Team> {
    return this.teamRepository.findOne({
      where: { id },
      relations: ['admins', 'members', 'tasks'],
    });
  }

  getAll(options?: {
    where?: { user_id?: string; team_name?: string };
    sort?: { team_name?: 'desc' | 'asc' };
    pagination?: { page: number; limit: number };
  }): Promise<Team[]> {
    const { where, sort, pagination } = options || {};

    const { user_id, team_name: where_team_name } = where || {};
    const { team_name: sort_team_name } = sort || {};
    const { page, limit} = pagination || {};
    // console.log(where_team_name);
    const queryOptions = {
      where: [
        {
          user_id: { members: { id: user_id } },
          team_name: { team_name: ILike(`%${where_team_name}%`) },
        },
      ],
      sort: {
        team_name: sort_team_name,
      },
      pagination: {
        take: limit,
        skip: (page - 1) * limit,
      },
    };

    const query = this.helper.buildQuery(options, queryOptions);
    // console.log(query);
    return this.teamRepository.find({
      ...query,
    });
  }

  create(team: Team): Promise<Team> {
    return this.teamRepository.save(team);
  }
  update(id: string, team: Team): Promise<Team> {
    return this.teamRepository.save(team);
  }
  async delete(id: string): Promise<void> {
    await this.teamRepository.delete(id);
  }
}
