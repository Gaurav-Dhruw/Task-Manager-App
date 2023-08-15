import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Task, Team, User } from 'src/domain/entities';
import { AuthorizationHelper } from './authorization.helper';
import { ValidateInputHelper } from './validate-input.helper';
import { ValidateOperationHelper } from './validate-operation.helper';

@Injectable()
export class TeamTaskHelper {
  constructor(
    private readonly authorization: AuthorizationHelper,
    private readonly validateInput: ValidateInputHelper,
    private readonly validateOperation: ValidateOperationHelper,
  ) {}
  //General Helpers
  filterUsersList(filterFrom: User[], matchList: User[]) {
    const updatedList = filterFrom.filter(
      (curr) => !matchList.find((user) => user.id === curr.id),
    );
    return updatedList;
  }

  mergeUsersList(originalList: User[], newList: User[]) {
    const mergedList = originalList.concat(newList);
    const resultantList = mergedList.filter(
      (curr, idx, self) =>
        idx === self.findIndex((user) => user.id === curr.id),
    );
    return resultantList;
  }

  // Get All Use-Case Helpers

  validateGetAllInput(team: Team): void {
    if (!this.validateInput.isValidTeam(team))
      throw new NotFoundException('Team Not Found');
  }

  // Get Use-Case Helpers
  validateGetInput(team: Team, task: Task): void {
    const errorMsgs: string[] = [];

    if (!this.validateInput.isValidTask(task)) errorMsgs.push('Task Not Found');
    if (!this.validateInput.isValidTeam(team)) errorMsgs.push('Team Not Found');

    if (errorMsgs.length > 0) throw new NotFoundException(errorMsgs);

    const isTeamTask = this.validateOperation.isTeamTask(task);
    const taskBelongsToTheTeam = this.validateOperation.taskBelongsToTheTeam(
      team,
      task,
    );
    if (!isTeamTask || !taskBelongsToTheTeam) throw new BadRequestException();
  }



  // Create Use-Case Helpers
  validateCreateInput(team: Team): void {
    if (!this.validateInput.isValidTeam(team))
      throw new NotFoundException('Team Not Found');
  }

  // Update Use-Case Helpers

  checkTaskLevelAuthorization(team: Team, task: Task, user: User) {
    const isAssignedToTask = this.authorization.isAssignedToTask(task, user);
    const isCreator = this.authorization.isTaskCreator(task, user);
    const isAdmin = this.authorization.isTeamAdmin(team, user);

    if (!isAssignedToTask && !isAdmin && !isCreator) throw new ForbiddenException('Access Not Allowed');
  }

  // Common Use-Case Helpers

  checkTeamLevelAuthorization(team: Team, user: User) {
    if (!this.authorization.isTeamMember(team, user))
      throw new UnauthorizedException('User Unauthorized');
  }

  checkSpecialAuthorization(team: Team, task: Task, user: User) {
    const isCreator = this.authorization.isTaskCreator(task, user);
    const isAdmin = this.authorization.isTeamAdmin(team, user);

    if (!isAdmin && !isCreator)
      throw new ForbiddenException('Special Access Required');
  }

  validateMutateInput(team: Team, task: Task): void {
    const errorMsgs: string[] = [];
    if (!this.validateInput.isValidTeam(team)) errorMsgs.push('Team Not Found');
    if (!this.validateInput.isValidTask(task)) errorMsgs.push('Task Not Found');

    if (errorMsgs.length > 0) throw new NotFoundException(errorMsgs);

    const isTeamTask = this.validateOperation.isTeamTask(task);
    const taskBelongsToTheTeam = this.validateOperation.taskBelongsToTheTeam(
      team,
      task,
    );
    if (!isTeamTask || !taskBelongsToTheTeam) throw new BadRequestException();
  }



  // Assignment Use-Case Helpers
  checkIfTeamMembers(team: Team, usersList: User[]): void {
    const members = team.members;
    const areTeamMembers = usersList.every(
      (user) => !!members.find((member) => member.id === user?.id),
    );

    if (!areTeamMembers)
      throw new BadRequestException('Invalid/Unauthorized Users Provided');
  }
}
