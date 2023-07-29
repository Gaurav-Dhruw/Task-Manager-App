import { Team, User } from "../entities";

export enum Priority {
  Low,
  Mid,
  High,
}

export enum Status {
  InProgress,
  Finished,
  Unfinished,
  PastDeadline,
}

export interface TokenPayload extends Pick<User, 'id' | 'email'>{}
