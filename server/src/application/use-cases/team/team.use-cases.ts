import { Injectable } from '@nestjs/common';
import { IDataService } from 'src/domain/abstracts';
import { Team, User } from 'src/domain/entities';

@Injectable()
export class TeamUseCases {
    constructor( private readonly dataService: IDataService,){}

    createTeam(teamInput: Team, teamCreator:User):Promise<Team>{
        teamInput.admins = [teamCreator];
        teamInput.members = [teamCreator];
        return this.dataService.team.create(teamInput);
    }
}
