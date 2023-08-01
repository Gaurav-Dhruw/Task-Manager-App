import { Injectable } from '@nestjs/common';
import { Task, Team, User } from 'src/domain/entities';

@Injectable()
export class AuthorizationHelper {
  isTeamMember(team: Team, user: User): boolean {
    return !!team.members.find((member) => member.id === user.id);
  }

  isTeamAdmin(team: Team, user: User): boolean {
    return !!team.admins.find((admin) => admin.id === user.id);
  }

  isTaskCreator(task:Task, user:User):boolean{
    return task.created_by.id === user.id;
  } 
}