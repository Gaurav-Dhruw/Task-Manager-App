import { Team, User } from '../entities';

export enum Priority {
  Low = 'Low',
  Mid = 'Mid',
  High = 'High',
}

export enum Status {
  InProgress = 'In Progress',
  Finished = 'Finished',
  Unfinished = 'Unfinished',
  PastDeadline = 'Past Deadline',
}

export interface TokenPayload extends Pick<User, 'id' | 'email'> {}
