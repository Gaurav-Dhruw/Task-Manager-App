import { User } from 'src/domain/entities';
import { TokenPayload } from 'src/domain/types';

export abstract class ITokenService {
  abstract generateToken(data: User): string;
  abstract decodeToken(token: string): TokenPayload | undefined;
}
