import { User } from '../entities';

export interface ITokenPayload extends Pick<User, 'id' | 'email'> {}

export type TokenExpiration = {
  hours?: number;
  minutes?: number;
  seconds?: number;
} & ({ hours: number } | { minutes: number } | { seconds: number });
