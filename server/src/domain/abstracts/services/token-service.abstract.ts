import { User } from 'src/domain/entities';

export abstract class ITokenService {
  abstract generateToken(data: Pick<User, 'id' | 'email'>): string;
  abstract decodeToken(token: string): Pick<User, 'id' | 'email'> | undefined;
}
