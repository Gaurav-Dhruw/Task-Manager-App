import { Injectable } from '@nestjs/common';
import { Task, Team } from 'src/domain/entities';

@Injectable()
export class ValidateOperationHelper {
    
    isTeamTask(task:Task):boolean{
        return !!task.team;
    }

    taskBelongsToTheTeam(task:Task, team:Team):boolean{
        return task?.team.id === team.id;
    }

}