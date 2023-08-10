import { Injectable } from '@nestjs/common';
import { Team, Task } from 'src/domain/entities';

@Injectable()
export class ValidateInputHelper {
  isValidTeam(team: Team): boolean {
    return !!team;
  }
  isValidTask(task: Task): boolean {
    return !!task;
  }
}
