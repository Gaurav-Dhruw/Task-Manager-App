import { User } from "../entities";

export interface TokenPayload extends Pick<User, 'id' | 'email'> {}
