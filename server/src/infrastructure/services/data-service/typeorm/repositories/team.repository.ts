import { Team } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ITeamRepository } from 'src/domain/abstracts';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamRepository implements ITeamRepository {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}

  getById(id: string): Promise<Team> {
    return this.teamRepository.findOne({
      where: { id },
      relations: ['admins', 'members', 'tasks'],
    });
  }


  getAll(options?:{user_id?: string}): Promise<Team[]> {
    const {user_id} = options || {};

    return this.teamRepository.find({ 
      where: {
         members: { 
          id: user_id 
        } 
      } 
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
