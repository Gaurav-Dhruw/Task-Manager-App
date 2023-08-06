import { User } from 'src/domain/entities';
import { TokenExpiration, TokenPayload } from 'src/domain/types';

export abstract class ITokenService {
  abstract generateToken(data: User, options?: TokenExpiration): string;
  abstract decodeToken(token: string): TokenPayload | undefined;
}
